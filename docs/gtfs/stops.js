// File: docs/gtfs/stops.gs
var stopsDoc = {
  "stop_id": {
    "description": "Identifies a stop, station, or station entrance.",
    "required": true
  },
  "stop_name": {
    "description": "Name of the stop, station, or entrance.",
    "required": true
  },
  "stop_lat": {
    "description": "Latitude of the stop, station, or station entrance.",
    "required": true
  },
  "stop_lon": {
    "description": "Longitude of the stop, station, or station entrance.",
    "required": true
  },
  "stop_code": {
    "description": "Short text or a number that uniquely identifies the stop for passengers."
  },
  "stop_desc": {
    "description": "Description of a stop."
  },
  "stop_url": {
    "description": "URL of a web page about the stop."
  },
  "location_type": {
    "description": "Type of location: 0 (or blank) for stops, 1 for stations, etc."
  }
};
