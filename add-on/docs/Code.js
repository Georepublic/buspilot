/**
 * Retrieves documentation mapping for Google Sheets' sidebar and validation.
 */
function getDocsMapping() {
  return {
    "agency": agencyDoc,
    "stops": stopsDoc,
    "routes": routesDoc,
    "trips": tripsDoc,
    "stop_times": stopTimesDoc,
    "calendar": calendarDoc,
    "calendar_dates": calendarDatesDoc,
    "vehicle_assignments": vehicleAssignmentsDoc,
    "attributions": attributionsDoc,
    "links": linksDoc,
    "news": newsDoc,
    "whitelist": whitelistDoc
  };
}

/**
 * Returns an array of sheet names for the TOC.
 */
function getSheetNamesForTOC() {
  var docs = getDocsMapping();
  return Object.keys(docs);
}

/**
 * Fetches the documentation as an HTML string for the provided sheet name.
 */
function getDocumentationForSheet(sheetName) {
  // Directly retrieve the 'docs' object using the 'getDocsMapping' function
  var docs = getDocsMapping();

  // Check if the documentation for the requested sheet exists in the docs object
  var sheetDocs = docs[sheetName];
  if (!sheetDocs) {
    return "No documentation available for this sheet.";
  }

  // Start building the HTML content for the documentation
  var htmlContent = '';
  // Iterate over the documentation entries for the provided sheet name
  for (var columnName in sheetDocs) {
    var colDoc = sheetDocs[columnName];
    // Add a style for required columns
    var requiredStyle = colDoc.required ? 'color:#1c7685;' : '';
    // Construct the HTML content
    htmlContent += `<label style="${requiredStyle}">${columnName}</label>`;
    htmlContent += `<p>${colDoc.description || ''}`;
    if (colDoc.note) {
      htmlContent += `<br><small>${colDoc.note}</small>`;
    }
    htmlContent += `</p>`;
  }

  return htmlContent;
}

/**
 * Creates a new sheet with the given name and columns based on documentation.
 */
function createSheetWithColumns(sheetName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  var ui = SpreadsheetApp.getUi();

  if (sheet) {
    ui.alert(`Sheet "${sheetName}" already exists.`);
    return;
  }

  sheet = ss.insertSheet(sheetName);
  var docs = getDocsMapping();
  var sheetDocs = docs[sheetName];
  if (!sheetDocs) {
    ui.alert(`No documentation found for "${sheetName}".`);
    return;
  }
  var headers = Object.keys(sheetDocs);
  setupSheetHeaders(sheet, headers, sheetDocs);
  adjustSheetLayout(sheet, headers.length);
  protectHeaderRow(sheet);
  applyDataValidations(sheet, headers, sheetDocs, ss);
  ui.alert(`Sheet "${sheetName}" created successfully.`);
}

function setupSheetHeaders(sheet, headers, sheetDocs) {
  var headerBackgrounds = headers.map(header => sheetDocs[header].required ? '#1c7685' : '#434343');
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers])
              .setFontColor('white')
              .setFontWeight('bold')
              .setBackgrounds([headerBackgrounds])
              .setHorizontalAlignment('center');
  sheet.setFrozenRows(1);
}

function applyDataValidations(sheet, headers, sheetDocs, ss) {
  headers.forEach((header, index) => {
    var columnDoc = sheetDocs[header];
    var range = sheet.getRange(2, index + 1, sheet.getMaxRows() - 1);
    if (columnDoc.enum) setEnumValidation(range, columnDoc.enum);
    if (columnDoc.foreign_key) setForeignKeyValidation(ss, sheet, columnDoc.foreign_key, index + 1);
  });
}

function setEnumValidation(range, enumValues) {
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(enumValues, true).build();
  range.setDataValidation(rule);
}

function setForeignKeyValidation(ss, sheet, foreignKey, columnIndex) {
  var referenceSheetName, referenceHeader;
  [referenceSheetName, referenceHeader] = foreignKey.split('.');
  var referenceSheet = ss.getSheetByName(referenceSheetName);
  if (!referenceSheet) {
    Logger.log(`Reference sheet not found: ${referenceSheetName}`);
    return;
  }

  // Get the headers row in the reference sheet
  var headersRow = referenceSheet.getRange(1, 1, 1, referenceSheet.getLastColumn()).getValues()[0];
  // Find the column index of the reference header
  var referenceColumnIndex = headersRow.indexOf(referenceHeader) + 1;
  if (referenceColumnIndex === 0) {
    Logger.log(`Reference header not found: ${referenceHeader}`);
    return;
  }

  var lastRow = referenceSheet.getLastRow();
  var referenceRangeA1Notation = `${referenceSheetName}!${columnToLetter(referenceColumnIndex)}2:${columnToLetter(referenceColumnIndex)}${lastRow}`;
  var validationRange = sheet.getRange(2, columnIndex, sheet.getMaxRows() - 1);
  var rule = SpreadsheetApp.newDataValidation().requireValueInRange(ss.getRange(referenceRangeA1Notation), true).build();
  validationRange.setDataValidation(rule);
}

function protectHeaderRow(sheet) {
  var protection = sheet.getRange('1:1').protect();
  protection.setWarningOnly(true);
}

function adjustSheetLayout(sheet, numberOfHeaders) {
  var defaultWidth = 130;
  for (var i = 1; i <= numberOfHeaders; i++) {
    sheet.setColumnWidth(i, defaultWidth);
  }
  var numColumns = sheet.getMaxColumns();
  if (numColumns > numberOfHeaders) {
    sheet.deleteColumns(numberOfHeaders + 1, numColumns - numberOfHeaders);
  }
  var maxRows = sheet.getMaxRows();
  if (maxRows > 11) {
    sheet.deleteRows(12, maxRows - 11);
  }
}

function columnToLetter(columnIndex) {
  let columnLetter = '';
  while (columnIndex > 0) {
    columnIndex--;
    columnLetter = String.fromCharCode('A'.charCodeAt(0) + (columnIndex % 26)) + columnLetter;
    columnIndex = Math.floor(columnIndex / 26);
  }
  return columnLetter;
}
