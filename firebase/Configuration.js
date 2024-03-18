// Configuration.gs

/**
 * Saves the configuration settings passed from the HTML form into document properties.
 * @param {Object} settings - An object containing key-value pairs of settings.
 */
function saveFirebaseConfiguration(settings) {
  var documentProperties = PropertiesService.getDocumentProperties();
  Object.keys(settings).forEach(function(key) {
    documentProperties.setProperty(key, settings[key]);
  });
}

/**
 * Fetches required document properties and returns them with placeholders if not set.
 */
function getFirebaseConfiguration() {
  var documentProperties = PropertiesService.getDocumentProperties();
  var configuration = {
    'email': {
      'value': documentProperties.getProperty('email'),
      'placeholder': 'e.g., firebase-a1b2c3@my-app.iam.gserviceaccount.com',
      'type': 'text'
    },
    'private_key': {
      'value': documentProperties.getProperty('private_key'),
      'placeholder': 'e.g., a1b2c3d4e5f6g7h8i9j0',
      'type': 'password'
    },
    'project_id': {
      'value': documentProperties.getProperty('project_id'),
      'placeholder': 'e.g., my-app',
      'type': 'text'
    }
  };

  return configuration;
}
