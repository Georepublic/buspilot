// File: docs/gtfs/routes.gs
var routesDoc = {
  "route_id": {
    "description": "Uniquely identifies a route.",
    "required": true
  },
  "route_type": {
    "description": "Describes the type of transportation used on a route.",
    "required": true
  },
  "agency_id": {
    "description": "Defines an agency for the specified route."
  },
  "route_short_name": {
    "description": "Short name of a route."
  },
  "route_long_name": {
    "description": "Full name of a route."
  },
  "route_desc": {
    "description": "Description of a route."
  },
  "route_url": {
    "description": "URL of a web page about the route."
  },
  "route_color": {
    "description": "Color to be displayed for the route."
  },
  "continuous_pickup": {
    "description": "Indicates that continuous pickup is allowed.",
    "enum": ["0","1","2","3"],
    "note": "0 - Continuous stopping pickup.<br>1 or empty - No continuous stopping pickup.<br>2 - Must phone agency to arrange continuous stopping pickup.<br>3 - Must coordinate with driver to arrange continuous stopping pickup."
  },
  "continuous_drop_off": {
    "description": "Indicates that continuous drop-off is allowed.",
    "enum": ["0","1","2","3"],
    "note": "0 - Continuous stopping pickup.<br>1 or empty - No continuous stopping pickup.<br>2 - Must phone agency to arrange continuous stopping pickup.<br>3 - Must coordinate with driver to arrange continuous stopping pickup."
  }
};
