// This function is called when 'Publish to Github' is selected from the custom menu.
function publishGtfs() {
  var requiredSheets = [
    'agency', 'stops', 'routes', 'trips', 'stop_times',
    'calendar', 'calendar_dates', 'vehicle_assignments', 'attributions'
  ];

  // Define any sheets that should be excluded from the ZIP archive.
  var excludedSheets = ['vehicle_assignments'];

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetsToInclude = [];
  var missingSheets = [];

  // Check each required sheet exists and is not in the excluded list before proceeding.
  requiredSheets.forEach(function(sheetName) {
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      missingSheets.push(sheetName);
    } else if (excludedSheets.indexOf(sheetName) === -1) {
      sheetsToInclude.push(sheet);
    }
  });

  if (missingSheets.length > 0) {
    // Alert the user which sheets are missing.
    SpreadsheetApp.getUi().alert('The following required sheets are missing: ' + missingSheets.join(', '));
    return; // Stop execution if there are missing sheets.
  }

  // Retrieve GitHub credentials and repo info from Document Properties.
  var documentProperties = PropertiesService.getDocumentProperties();
  var githubToken = documentProperties.getProperty('GITHUB_TOKEN');
  var repoName = documentProperties.getProperty('REPO_NAME');
  var folderPath = documentProperties.getProperty('FOLDER_PATH');

  // Loop through included sheets and upload as a .txt file to GitHub.
  sheetsToInclude.forEach(function(sheet) {
    var sheetName = sheet.getName();
    var fileName = sheetName + '.txt';
    var csvData = convertSheetToCsv(sheet);
    createOrUpdateFileOnGitHub(fileName, repoName, folderPath, csvData, githubToken);
  });

  // Create a ZIP archive of the sheets and upload to GitHub.
  var zipBlob = createZipArchive(sheetsToInclude, excludedSheets); // Pass the excludedSheets to the function.
  var zipFileName = "gtfs_data.zip";
  createOrUpdateFileOnGitHub(zipFileName, repoName, folderPath, zipBlob.getBytes(), githubToken);
}
