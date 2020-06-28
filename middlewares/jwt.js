const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const username = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      console.log(username);
      if (username) {
        return next();
      }
      return res.status(401).send({ error: "user not found!" });
    }
  } catch (error) {
    return res.status(400).send({ error });
  }
};

module.exports = {
  verifyToken,
};
