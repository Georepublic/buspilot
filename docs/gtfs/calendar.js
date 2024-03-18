// File: docs/gtfs/calendar.gs
var calendarDoc = {
  "service_id": {
    "description": "Uniquely identifies a set of dates when service is available.",
    "required": true
  },
  "monday": {
    "description": "Indicates whether the service is available on Mondays.",
    "enum": ["0","1"],
    "note": "1 - Service is available for all days in the date range.<br>0 - Service is not available for days in the date range.",
    "required": true
  },
  "tuesday": {
    "description": "Indicates whether the service is available on Tuesdays.",
    "enum": ["0","1"],
    "note": "1 - Service is available for all days in the date range.<br>0 - Service is not available for days in the date range.",
    "required": true
  },
  "wednesday": {
    "description": "Indicates whether the service is available on Wednesdays.",
    "enum": ["0","1"],
    "note": "1 - Service is available for all days in the date range.<br>0 - Service is not available for days in the date range.",
    "required": true
  },
  "thursday": {
    "description": "Indicates whether the service is available on Thursdays.",
    "enum": ["0","1"],
    "note": "1 - Service is available for all days in the date range.<br>0 - Service is not available for days in the date range.",
    "required": true
  },
  "friday": {
    "description": "Indicates whether the service is available on Fridays.",
    "enum": ["0","1"],
    "note": "1 - Service is available for all days in the date range.<br>0 - Service is not available for days in the date range.",
    "required": true
  },
  "saturday": {
    "description": "Indicates whether the service is available on Saturdays.",
    "enum": ["0","1"],
    "note": "1 - Service is available for all days in the date range.<br>0 - Service is not available for days in the date range.",
    "required": true
  },
  "sunday": {
    "description": "Indicates whether the service is available on Sundays.",
    "enum": ["0","1"],
    "note": "1 - Service is available for all days in the date range.<br>0 - Service is not available for days in the date range.",
    "required": true
  },
  "start_date": {
    "description": "Start date for the service interval.",
    "required": true
  },
  "end_date": {
    "description": "End date for the service interval.",
    "required": true
  }
};
