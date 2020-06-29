const requestHandlers = require("../request_handlers/follow");
const { verifyToken } = require("../../middlewares/jwt");

module.exports = async (router) => {
  router.post(
    "/user/follow/:userId",
    verifyToken,
    requestHandlers.handleFollow
  );
  router.post(
    "/user/unfollow/:userId",
    verifyToken,
    requestHandlers.handleUnfollow
  );
};
