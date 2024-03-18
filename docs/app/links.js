// File: docs/app/links.gs
var linksDoc = {
  "name": {
    "description": "Name of the link.",
    "required": true
  },
  "visible": {
    "description": "Indicates if the link is visible on the app.",
    "enum": ["public","loggedin","approved"],
    "note": "public - Visible to all users.<br>loggedin - Visible to logged in users.<br>approved - Visible to approved users.",
    "required": true
  },
  "audience": {
    "description": "Indicates the audience for the link.",
    "enum": [],
  },
  "url": {
    "description": "URL of the link.",
    "required": true
  }
};
