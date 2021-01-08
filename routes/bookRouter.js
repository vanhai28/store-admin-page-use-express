const express = require("express");
const router = express.Router();

const autheMiddleware = require("../middleware/authenticate");
const bookController = require("../controllers/bookController");

//--------------------- POST -------------------------------

/* POST edit book page. */
router.post(
  "/edit",

  bookController.saveEditBook
);

/* GET add book page. */
router.post("/add", (req, res, next) => {
  bookController.SaveNewBook(req, res, next);
});

/* Post delete book page. */
router.post("/delete", bookController.deleteBook);
//--------------------- GET -------------------------------
router.get("/search", bookController.searchBook);

/* GET edit book page. */
router.get("/edit", bookController.RenderEditBookPage);

/* GET list book page. */
router.get(
  "/list",

  bookController.RenderListBookPage
);

/* GET list book page. */
router.get("/api/lists", bookController.getAPIBook);
router.get("/api/list", bookController.getAPIBook);

/* GET add book page. */
router.get(
  "/add",

  bookController.RenderAddBookPage
);

/**
 * get api all category
 */
router.get("/api/category/all", bookController.getAllCategory);

module.exports = router;
