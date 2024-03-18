// Configuration.gs

/**
 * Saves the configuration settings passed from the HTML form into document properties.
 * @param {Object} settings - An object containing key-value pairs of settings.
 */
function saveGithubConfiguration(settings) {
  var documentProperties = PropertiesService.getDocumentProperties();
  Object.keys(settings).forEach(function(key) {
    documentProperties.setProperty(key, settings[key]);
  });
}

/**
 * Fetches required document properties and returns them with placeholders if not set.
 */
function getGithubConfiguration() {
  var documentProperties = PropertiesService.getDocumentProperties();
  var configuration = {
    'FOLDER_PATH': {
      'value': documentProperties.getProperty('FOLDER_PATH'),
      'placeholder': 'e.g., gtfs/',
      'type': 'text'
    },
    'REPO_NAME': {
      'value': documentProperties.getProperty('REPO_NAME'),
      'placeholder': 'e.g., username/repo',
      'type': 'text'
    },
    'GITHUB_TOKEN': {
      'value': documentProperties.getProperty('GITHUB_TOKEN'),
      'placeholder': 'e.g., a1b2c3d4e5f6g7h8i9j0',
      'type': 'password'
    }
  };

  return configuration;
}
