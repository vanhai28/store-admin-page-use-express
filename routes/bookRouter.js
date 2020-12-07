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
router.post("/add-book", (req, res, next) => {
  bookController.addBook(req, res, next);
});

/* GET delete book page. */
router.post(
  "/delete-book",

  bookController.deleteBook
);
//--------------------- GET -------------------------------

/* GET edit book page. */
router.get("/edit", bookController.editBook);

/* GET list book page. */
router.get(
  "/list-book",

  bookController.listBook
);

/* GET add book page. */
router.get(
  "/add-book",

  bookController.addBookPage
);

module.exports = router;
