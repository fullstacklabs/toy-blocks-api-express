require("dotenv").load();

const express = require("express");
const app = express();
const Knex = require("knex");
const knexConfig = require("./knexfile");
const { Model } = require("objection");
const bodyParser = require("body-parser");
const { Raven, logger } = require("./extensions/logger.js");

LOGGER = logger;

app.use(bodyParser.json({ limit: "50mb", type: "*/json" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(Raven.errorHandler());
app.use(Raven.requestHandler());

app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  console.log(err);
  res.end(res.sentry + "\n");
});

const knex = Knex(knexConfig);
Model.knex(knex);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.options("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.sendStatus(200);
});

require("./routes/routes")(app);

const port = process.env.PORT || 3333;
if (!module.parent) {
  app.listen(port, function() {
    console.log(`Listening on port: ${port}`);
  });
}

module.exports = app;
