// File: docs/gtfs/stop_times.gs
var stopTimesDoc = {
  "trip_id": {
    "description": "Identifies a trip.",
    "foreign_key": "trips.trip_id",
    "required": true
  },
  "arrival_time": {
    "description": "Specifies the arrival time at a specific stop for a specific trip on a route.",
    "required": true
  },
  "departure_time": {
    "description": "Specifies the departure time from a specific stop for a specific trip on a route.",
    "required": true
  },
  "stop_id": {
    "description": "Identifies the serviced stop.",
    "foreign_key": "stops.stop_id",
    "required": true
  },
  "stop_sequence": {
    "description": "Order of stops for a particular trip.",
    "note": "Order of stops for a particular trip. The values must increase along the trip but do not need to be consecutive.",
    "required": true
  },
  "pickup_type": {
    "description": "Indicates pickup method.",
    "enum": ["0","1","2","3"],
    "note": "Indicates pickup method. Valid options are:<br>0 or empty - Regularly scheduled pickup.<br>1 - No pickup available.<br>2 - Must phone agency to arrange pickup.<br>3 - Must coordinate with driver to arrange pickup."
  },
  "drop_off_type": {
    "description": "Indicates drop-off method.",
    "enum": ["0","1","2","3"],
    "note": "Indicates pickup method. Valid options are:<br>0 or empty - Regularly scheduled pickup.<br>1 - No pickup available.<br>2 - Must phone agency to arrange pickup.<br>3 - Must coordinate with driver to arrange pickup."
  },
  "timepoint": {
    "description": "Indicates if the arrival time is an exact time or an estimate.",
    "enum": ["0","1"],
    "note": "0 - Times are considered approximate.<br>1 or empty - Times are considered exact."
  }
};
