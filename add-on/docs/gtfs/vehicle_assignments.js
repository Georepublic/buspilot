// File: docs/gtfs/vehicle_assignments.gs
var vehicleAssignmentsDoc = {
  "start_date": {
    "description": "The start date of the vehicle assignment.",
    "note": "This sheet and attribute are not part of the GTFS specification.",
    "required": true
  },
  "end_date": {
    "description": "The end date of the vehicle assignment.",
    "note": "This sheet and attribute are not part of the GTFS specification.",
    "required": true
  },
  "trip_id": {
    "description": "Identifies the trip associated with the vehicle assignment.",
    "note": "This sheet and attribute are not part of the GTFS specification.",
    "foreign_key": "trips.trip_id",
    "required": true
  },
  "vehicle_id": {
    "description": "Identifies the vehicle used for the trip.",
    "note": "This sheet and attribute are not part of the GTFS specification.",
    "required": true
  }
};
