const { verifyToken } = require("../../middlewares/jwt");
const express = require("express");
const router = express.Router();

module.exports = async (app) => {
  app.get("/", (req, res, next) => {
    res.send("Welcome to goodreads clone");
  });

  router.get("/me", verifyToken, (req, res, next) => {
    res.send("Welcome");
  });

  require("./auth")(router);
  require("./follow")(router);
  require("./books")(router);

  app.use("/api/v0", router);
};
