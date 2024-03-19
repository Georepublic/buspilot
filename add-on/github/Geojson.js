// Updates GeoJSON stop points
function updateGeoJson() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetNames = ['routes', 'trips', 'stop_times', 'stops'];
  var missingSheets = sheetNames.filter(function(name) {
    return !ss.getSheetByName(name);
  });

  if (missingSheets.length > 0) {
    SpreadsheetApp.getUi().alert('The following sheets are missing: ' + missingSheets.join(', '));
    return; // Exit the function if any required sheet is missing
  }

  // Retrieve GitHub credentials and repo info from Document Properties.
  var documentProperties = PropertiesService.getDocumentProperties();
  var githubToken = documentProperties.getProperty('GITHUB_TOKEN');
  var repoName = documentProperties.getProperty('REPO_NAME');

  var routesData = getDataByColumnName(ss.getSheetByName('routes'));
  var tripsData = getDataByColumnName(ss.getSheetByName('trips'));
  var stopTimesData = getDataByColumnName(ss.getSheetByName('stop_times'));
  var stopsData = getDataByColumnName(ss.getSheetByName('stops'));

  routesData.forEach(function(routeRow) {
    var routeId = routeRow['route_id'];
    var fileName = routeId + '.geojson';
    var folderPath = 'routes/';
    var url = 'https://api.github.com/repos/' + repoName + '/contents/' + folderPath + fileName;
    var response = UrlFetchApp.fetch(url, {
      headers: {
        'Authorization': 'token ' + githubToken,
        'User-Agent': 'GoogleAppsScript',
      }
    });
    var responseData = JSON.parse(response.getContentText());
    var existingGeoJson = JSON.parse(Utilities.newBlob(Utilities.base64Decode(responseData.content)).getDataAsString());

    var stopIdsForRoute = [];
    tripsData.forEach(function(tripRow) {
      if (tripRow['route_id'] === routeId) {
        var tripId = tripRow['trip_id'];
        stopTimesData.forEach(function(stopTimeRow) {
          if (stopTimeRow['trip_id'] === tripId) {
            var stopId = stopTimeRow['stop_id'];
            if (stopIdsForRoute.indexOf(stopId) === -1) {
              stopIdsForRoute.push(stopId);
            }
          }
        });
      }
    });

    existingGeoJson.features = existingGeoJson.features.filter(function(feature) {
      return feature.geometry.type !== 'Point';
    });

    stopIdsForRoute.forEach(function(stopId) {
      var stopRow = stopsData.find(function(row) { return row['stop_id'] === stopId; });
      if (stopRow) {
        var stopFeature = {
          "type": "Feature",
          "properties": {
            "name": stopRow['stop_name'],
            "stop_id": stopId
          },
          "geometry": {
            "type": "Point",
            "coordinates": [parseFloat(stopRow['stop_lon']), parseFloat(stopRow['stop_lat'])]
          }
        };
        existingGeoJson.features.push(stopFeature);
      }
    });

    var updatedGeoJsonString = JSON.stringify(existingGeoJson, null, 2);
    createOrUpdateFileOnGitHub(fileName, repoName, folderPath, updatedGeoJsonString, githubToken);
  });
}

function getDataByColumnName(sheet) {
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var content = data.slice(1);
  return content.map(function(row) {
    var obj = {};
    headers.forEach(function(header, index) {
      obj[header] = row[index];
    });
    return obj;
  });
}
