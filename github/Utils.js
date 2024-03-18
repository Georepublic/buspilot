// This function creates a ZIP archive containing the contents of all sheets (except excluded ones).
function createZipArchive(includedSheets, excludedSheets) {
  var blobs = [];  // Array to hold all the blobs.

  // Loop through each sheet, check against exclusion, convert to CSV, and add to blobs array.
  includedSheets.forEach(function(sheet) {
    var sheetName = sheet.getName();
    if (excludedSheets.indexOf(sheetName) === -1) {  // Check exclusion list.
      var fileName = sheetName + '.txt';
      var csvData = convertSheetToCsv(sheet);
      var csvBlob = Utilities.newBlob(csvData, "text/plain", fileName);
      blobs.push(csvBlob);  // Add csvBlob to blobs array.
    }
  });

  // Create a single ZIP archive from the blobs array.
  var zipFileName = "gtfs_data.zip";
  var zipBlob = Utilities.zip(blobs, zipFileName);
  return zipBlob;
}

// This function creates or updates a file on GitHub.
function createOrUpdateFileOnGitHub(fileName, repoName, folderPath, data, token) {
  // Construct the URL for the GitHub API.
  var url = 'https://api.github.com/repos/' + repoName + '/contents/' + folderPath + fileName;

  // Check if the file already exists.
  var fileExists = false;
  var sha = '';
  try {
    var response = UrlFetchApp.fetch(url, {
      headers: {
        'Authorization': 'token ' + token,
        'User-Agent': 'GoogleAppsScript',
      }
    });
    var responseData = JSON.parse(response.getContentText());
    fileExists = true;
    sha = responseData.sha;  // Get the sha value of the existing file.
  } catch (e) {
    // Handle the exception (e.g., file doesn't exist).
  }

  // Set up the request options.
  var options = {
    method: 'PUT',
    headers: {
      'Authorization': 'token ' + token,
      'User-Agent': 'GoogleAppsScript',
    },
    contentType: 'application/json',
    payload: JSON.stringify({
      message: 'Update ' + fileName,
      content: Utilities.base64Encode(data),
      sha: fileExists ? sha : undefined  // Include the sha value if the file exists.
    })
  };

  // Send the request to create or update the file on GitHub.
  UrlFetchApp.fetch(url, options);
}
