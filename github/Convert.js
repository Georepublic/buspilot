// This function converts a sheet to CSV format.
function convertSheetToCsv(sheet) {
  var data = sheet.getDataRange().getValues();
  var csv = '';
  for (var i = 0; i < data.length; i++) {
    csv += data[i].join(',') + '\n';
  }
  return csv;
}
