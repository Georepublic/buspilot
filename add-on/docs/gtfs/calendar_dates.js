// File: docs/gtfs/calendar_dates.gs
var calendarDatesDoc = {
  "service_id": {
    "description": "Uniquely identifies a set of dates when service is available.",
    "foreign_key": "calendar.service_id",
    "required": true
  },
  "date": {
    "description": "Represents a date when service exception is in effect.",
    "required": true
  },
  "exception_type": {
    "description": "Indicates whether service is available on the date specified in the date field.",
    "enum": ["1","2"],
    "note": "Indicates whether service is available on the date specified in the date field. Valid options are:<br>1 - Service has been added for the specified date.<br>2 - Service has been removed for the specified date.",
    "required": true
  }
};
