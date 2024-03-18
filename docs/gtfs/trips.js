// File: docs/gtfs/trips.gs
var tripsDoc = {
  "trip_id": {
    "description": "Identifies a trip.",
    "required": true
  },
  "route_id": {
    "description": "Identifies a route.",
    "foreign_key": "routes.route_id",
    "required": true
  },
  "service_id": {
    "description": "Identifies a set of dates when service is available for one or more routes.",
    "foreign_key": "calendar.service_id",
    "required": true
  },
  "trip_headsign": {
    "description": "Text that appears on a sign that identifies the trip's destination to passengers."
  },
  "trip_short_name": {
    "description": "Public facing text used to identify the trip to passengers."
  },
  "direction_id": {
    "description": "Indicates the direction of travel for a trip.",
    "enum": ["0","1"],
    "note": "0 - Travel in one direction (e.g. outbound travel).<br>1 - Travel in the opposite direction (e.g. inbound travel)."
  },
  "wheelchair_accessible": {
    "description": "Indicates if the vehicle used for this trip can accommodate at least one wheelchair.",
    "enum": ["0","1","2"],
    "note": "0 or empty - No accessibility information for the trip.<br>1 - Vehicle being used on this particular trip can accommodate at least one rider in a wheelchair.<br>2 - No riders in wheelchairs can be accommodated on this trip."
  }
};
