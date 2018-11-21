[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# toy_blocks_api_express

## Setup

### Dependencies

* PostgreSQL
  * The app expects the following DB setup:
    * database: "toy_blocks_api_express",
    * user: "toyblocksapiexpress",
    * password: "toyblocksapiexpress"

### Process

* Clone the repo & cd to the project directory
* run `cp .env.example .env`
* Open `.env` and set `CLIENT_APP_URL` to the address of the client (if needed)
* run `npm install`
* run `psql -c 'CREATE ROLE toyblocksapiexpress WITH LOGIN CREATEDB;'`
* run `psql -c 'create database toy_blocks_api_express;'`
* run `./node_modules/.bin/knex migrate:latest`
* run `npm start` (additionally, you may run `npm start:dev` for development purpose)
* run `npm test` (will reset the DB prior to testing, and print code coverage when complete)

## Development

This application revolves around a core set of file types to provide API endpoints to external users.

These file types are:

* Database setup (migrations and seeds, `db/`)
* The router (`routes/router.js`)
* HTTP handlers (`src/handlers/`)
* Database models (`src/models/`)
* Tests (`tests/`)
