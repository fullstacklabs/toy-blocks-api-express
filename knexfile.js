const path = require("path");
const envFile = process.env.NODE === "test" ? ".env.test" : ".env";

require("dotenv").config({
  path: `${path.resolve(__dirname)}/${envFile}`
});

module.exports = {
  client: "postgresql",
  connection: {
    host: process.env.RDS_HOSTNAME || "localhost",
    port: process.env.RDS_PORT || 5432,
    database: process.env.RDS_DB_NAME || "toy_blocks_api_express",
    user: process.env.RDS_USERNAME || "toyblocksapiexpress",
    password: process.env.RDS_PASSWORD || "toyblocksapiexpress"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};
