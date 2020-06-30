const requestHandlers = require("../request_handlers/books");
const { verifyToken } = require("../../middlewares/jwt");

module.exports = async (router) => {
  router.post("/book", verifyToken, requestHandlers.handleCreateBook);
  router.delete("/book/:bookId", verifyToken, requestHandlers.handleDeleteBook);
  router.get("/book/:bookId", verifyToken, requestHandlers.handleGetBook);
  router.put("/book/:bookId", verifyToken, requestHandlers.handleUpdateBook);
};
