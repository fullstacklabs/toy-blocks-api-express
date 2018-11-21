const express = require("express");
const blocksController = require("../src/handlers/api/v1/blocksHandler");
const peersController = require("../src/handlers/api/v1/peersHandler");
const statusHandler = require("../src/handlers/api/v1/statusHandler");

module.exports = function(app) {
  const apiRouter = express.Router();

  apiRouter.get("/blocks", blocksController.index);
  apiRouter.get("/blocks/:id", blocksController.show);
  apiRouter.post("/blocks", blocksController.create);

  apiRouter.get("/peers", peersController.index);
  apiRouter.post("/peers", peersController.create);
  apiRouter.delete("/peers/:id", peersController.destroy);

  apiRouter.get("/status", statusHandler.show);

  app.use("/api/v1", apiRouter);
};
