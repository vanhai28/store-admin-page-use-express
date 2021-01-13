const express = require("express");
const router = express.Router();

const autheMiddleware = require("../middleware/authenticate");
const bookController = require("../controllers/bookController");

//--------------------- POST -------------------------------

/* POST edit book page. */
router.post("/edit", autheMiddleware.authenUser, bookController.saveEditBook);

/* GET add book page. */
router.post("/add", autheMiddleware.authenUser, bookController.SaveNewBook);

/* Post delete book page. */
router.post("/delete", autheMiddleware.authenUser, bookController.deleteBook);
//--------------------- GET -------------------------------
router.get("/search", autheMiddleware.authenUser, bookController.searchBook);

/* GET edit book page. */
router.get(
  "/edit",
  autheMiddleware.authenUser,
  bookController.RenderEditBookPage
);

/* GET list book page. */
router.get(
  "/list",
  autheMiddleware.authenUser,
  bookController.RenderListBookPage
);

/* GET list book page. */
router.get("/api/lists", autheMiddleware.authenUser, bookController.getAPIBook);
router.get("/api/list", autheMiddleware.authenUser, bookController.getAPIBook);

/* GET add book page. */
router.get(
  "/add",
  autheMiddleware.authenUser,
  bookController.RenderAddBookPage
);

/**
 * get api all category
 */
router.get(
  "/api/category/all",
  autheMiddleware.authenUser,
  bookController.getAllCategory
);

module.exports = router;
