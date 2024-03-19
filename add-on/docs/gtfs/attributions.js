// File: docs/gtfs/attributions.gs
var attributionsDoc = {
  "organization_name": {
    "description": "The name of the organization to attribute.",
    "required": true
  },
  "is_producer": {
    "description": "Indicates if the organization is a producer of the data.",
    "enum": ["0","1"],
    "note": "0 or empty - Organization doesn’t have this role.<br>1 - Organization does have this role.",
    "required": true
  },
  "is_operator": {
    "description": "Indicates if the organization is an operator of the service.",
    "enum": ["0","1"],
    "note": "0 or empty - Organization doesn’t have this role.<br>1 - Organization does have this role.",
    "required": true
  },
  "is_authority": {
    "description": "Indicates if the organization is an authority for the service.",
    "enum": ["0","1"],
    "note": "0 or empty - Organization doesn’t have this role.<br>1 - Organization does have this role.",
    "required": true
  },
  "attribution_url": {
    "description": "URL to the organization’s website."
  },
  "attribution_email": {
    "description": "Email contact for the organization."
  }
};
