// File: docs/app/news.gs
var newsDoc = {
  "date": {
    "description": "Date of the news.",
    "required": true
  },
  "title": {
    "description": "Title of the news.",
    "required": true
  },
  "category": {
    "description": "Category of the news.",
    "enum": ["alert","info","news"],
    "note": "alert - Alert.<br>info - Information.<br>news - News.",
    "required": true
  },
  "visible": {
    "description": "Indicates if the news is visible on the website.",
    "enum": ["public","loggedin","approved"],
    "note": "public - Visible to all users.<br>loggedin - Visible to logged in users.<br>approved - Visible to approved users.",
    "required": true
  },
  "audience": {
    "description": "Indicates the audience for the news.",
    "enum": [],
  },
  "content": {
    "description": "Content of the news.",
    "required": true
  },
  "url": {
    "description": "URL of the news."
  }
};
