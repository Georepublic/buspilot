# Buspilot Manager

This is a Google Apps Script project managed with [clasp](https://github.com/google/clasp). The project is designed to manage data related to a bus route application, with the data stored in various sheets in a Google Spreadsheet. The project includes a custom menu for easy access to functions for publishing and updating data, configuring connections to Firebase and GitHub, and displaying help documentation.

## Description

A brief description of what this project does and who it's for.

## Setup

Install clasp globally:

```sh
npm install -g @google/clasp
```

Login to your Google account:

```sh
clasp login
```

## Usage

The project includes a `Menu.gs` script that creates a custom menu in the Google Spreadsheet. The menu includes the following items:

* App Data: Publish news, links, and whitelist (permissions)
* Bus Routes: Publish GTFS (bus schedule) and update transit map data (GeoJSON)
* Configure: Set up Firebase and GitHub connections
* Load Templates: Create app data sheets and bus routes sheets
* Help / Documentation: Display help documentation in a sidebar

## Github Pages

The `web` directory contains documents published as Github Pages. To test the pages locally run the following:

```sh
docker compose up --build
```

## License

This project is licensed under [GNU General Public License v3.0](./LICENSE).
