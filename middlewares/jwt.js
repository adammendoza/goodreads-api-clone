const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const username = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      if (username) {
        req.username = username;
        return next();
      }
      return res.status(401).send({ error: "user not found!" });
    } else {
      throw new Error("Please provide authorization token");
    }
  } catch (error) {
    return res.status(400).send({ error: error.message || error });
  }
};

module.exports = {
  verifyToken,
};
