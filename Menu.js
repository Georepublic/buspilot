// Menu.js
function onOpen() {
  var ui = SpreadsheetApp.getUi();

  // Create submenus
  var appDataSubMenu = ui.createMenu('App Data')
    .addItem('Publish News', 'publishNews')
    .addItem('Publish Links', 'publishLinks')
    .addItem('Publish Whitelist (Permissions)', 'publishWhitelist')

  var busRoutesMenu = ui.createMenu('Bus Routes')
    .addItem('Publish GTFS (Bus Schedule)', 'publishGtfs')
    .addItem('Update Transit Map Data (GeoJSON)', 'updateGeoJson');

  var adminMenu = ui.createMenu('Configure')
    .addItem('Firebase Connection', 'showFirebaseSidebar')
    .addItem('GitHub Connection', 'showGithubSidebar');

  var templateMenu = ui.createMenu('Load Templates')
    .addItem('Create App Data Sheets', 'createAppDataSheets')
    .addItem('Create Bus Routes Sheets', 'createBusRoutesSheets');

  // Create main menu and add submenus
  ui.createMenu('Buspilot')
    .addSubMenu(appDataSubMenu)
    .addSubMenu(busRoutesMenu)
    .addSeparator()
    .addSubMenu(adminMenu)
    .addSubMenu(templateMenu)
    .addSeparator()
    .addItem('Help / Documentation', 'showHelpSidebar')
    .addToUi();
}

function showFirebaseSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('firebase/Sidebar')
      .setTitle('Configure Firebase Connection');
  SpreadsheetApp.getUi().showSidebar(html);
}

function showGithubSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('github/Sidebar')
      .setTitle('Configure Github Connection');
  SpreadsheetApp.getUi().showSidebar(html);
}

function showHelpSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('docs/Sidebar')
      .setTitle('Help / Documentation')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showSidebar(html);
}

function createAppDataSheets() {
  var sheetNames = ['links', 'news', 'whitelist'];
  createSheetsFromArray(sheetNames);
}

function createBusRoutesSheets() {
  var sheetNames = ['agency', 'stops', 'routes', 'trips', 'stop_times', 'calendar', 'calendar_dates', 'vehicle_assignments', 'attributions'];
  createSheetsFromArray(sheetNames);
}

function createSheetsFromArray(sheetNames) {
  sheetNames.forEach(function(sheetName) {
    // Check if the sheet already exists to avoid creating a duplicate
    if (!SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)) {
      createSheetWithColumns(sheetName);
    } else {
      // Log or alert the user that the sheet already exists
      SpreadsheetApp.getUi().alert(`Sheet "${sheetName}" already exists.`);
    }
  });
}
