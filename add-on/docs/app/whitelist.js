// File: docs/app/whitelist.gs
var whitelistDoc = {
  "email": {
    "description": "Email address of the user.",
    "required": true
  },
  "name": {
    "description": "Name of the user."
  },
  "group": {
    "description": "Group of the user.",
    "enum": ["staff","parent","tester","guest"]
  }
};
