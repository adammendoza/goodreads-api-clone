const { verifyToken } = require("../middlewares/jwt");

module.exports = async (app) => {
  app.get("/", (req, res, next) => {
    res.send("Welcome to goodreads clone");
  });

  app.get("/me", verifyToken, (req, res, next) => {
    res.send("Welcome");
  });

  require("./auth")(app);
};
