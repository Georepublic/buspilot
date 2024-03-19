// File: docs/gtfs/agency.gs
var agencyDoc = {
  "agency_id": {
    "description": "A unique identifier for the transit agency.",
    "required": true
  },
  "agency_name": {
    "description": "The full name of the transit agency.",
    "required": true
  },
  "agency_url": {
    "description": "The URL of the transit agency’s website.",
    "required": true
  },
  "agency_timezone": {
    "description": "The timezone in which the agency is located, expressed in the standard area/city format.",
    "required": true
  },
  "agency_lang": {
    "description": "The primary language that the transit agency uses for all its communications.",
    "enum": ["de","en","ja"]
  },
  "agency_phone": {
    "description": "A phone number that customers can use to contact the transit agency."
  },
  "agency_fare_url": {
    "description": "A URL that directs users to the transit agency’s fare information page."
  },
  "agency_email": {
    "description": "An email address that is used for customer service inquiries and feedback."
  }
};
