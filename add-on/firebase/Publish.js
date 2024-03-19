function writeToFirestore(SHEET_NAME, COLLECTION_NAME, UNIQUE_FIELD, deleteExisting) {

  var ss = SpreadsheetApp.getActiveSpreadsheet(); // Use the current active spreadsheet
  var sheet = ss.getSheetByName(SHEET_NAME);

  // Check if the sheet exists to proceed with Firestore writing, if not, show an alert.
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Sheet named '" + SHEET_NAME + "' does not exist.");
    return; // Exit the function if the sheet doesn't exist
  }

  try {
    // Retrieve credentials from document properties
    var documentProperties = PropertiesService.getDocumentProperties();
    var email = documentProperties.getProperty('email');
    var key = documentProperties.getProperty('private_key').replace(/\\n/g, '\n'); // Replace escaped newlines
    var projectId = documentProperties.getProperty('project_id');

    // Initialize Firestore
    var firestore = FirestoreApp.getFirestore(email, key, projectId);

    // Delete existing documents if specified
    if (deleteExisting) {
      var documents = firestore.getDocuments(COLLECTION_NAME);
      for (var i = 0; i < documents.length; i++) {
        var relativePath = documents[i].name.split('/documents/')[1];
        firestore.deleteDocument(relativePath);
      }
    }

    // Open the Spreadsheet
    var sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // Get data from the sheet
    var data = sheet.getDataRange().getValues();

    // Retrieve the headers
    var headers = data[0];

    // Find the index of the unique field column
    var uniqueFieldIndex = headers.indexOf(UNIQUE_FIELD);
    if (uniqueFieldIndex === -1) {
      throw new Error('Unique field not found in headers');
    }

    // Loop through each row (excluding headers) and write to Firestore
    for (var i = 1; i < data.length; i++) {
      var row = data[i];

      // Create an object with keys from headers and values from row data
      var dataToSave = {};
      for (var j = 0; j < headers.length; j++) {
        dataToSave[headers[j]] = row[j];
      }

      // Use a hash of the unique field as the document ID
      var uniqueValue = row[uniqueFieldIndex].toString();
      var documentId = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, uniqueValue, Utilities.Charset.UTF_8)
        .map(function(byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');

      // Create or update the document in Firestore, using the hashed unique field as the document ID
      firestore.updateDocument(COLLECTION_NAME + '/' + documentId, dataToSave);
    }
  } catch (error) {
    // Log error message
    Logger.log('Error: ' + error.message);
  }
}

function publishNews() {
  var SHEET_NAME = 'news';
  var COLLECTION_NAME = 'news';
  var UNIQUE_FIELD = 'title'; // The name of the column to use as the document ID
  writeToFirestore(SHEET_NAME, COLLECTION_NAME, UNIQUE_FIELD, true);
}

function publishLinks() {
  var SHEET_NAME = 'links';
  var COLLECTION_NAME = 'links';
  var UNIQUE_FIELD = 'url'; // The name of the column to use as the document ID
  writeToFirestore(SHEET_NAME, COLLECTION_NAME, UNIQUE_FIELD, true);
}

function publishWhitelist() {
  var SHEET_NAME = 'whitelist';
  var COLLECTION_NAME = 'whitelist';
  var UNIQUE_FIELD = 'email'; // The name of the column to use as the document ID
  writeToFirestore(SHEET_NAME, COLLECTION_NAME, UNIQUE_FIELD, true);
}
