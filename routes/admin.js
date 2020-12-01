const express = require("express");
const router = express.Router();
const controllerDef = require("../controllers/pagesController");
const autheMiddleware = require("../middleware/authenticate");
const bookController = require("../controllers/bookController");
const userController = require("../controllers/userController");
const sessionModel = require("../model/mongooseModel/sessionModel");

/* GET home page. */
router.get("/dashboard", autheMiddleware.authenUser, controllerDef.index);

// /* GET table page. */
// router.get("/tables", controllerDef.table);

/* GET edit book page. */
router.get("/book/edit", autheMiddleware.authenUser, bookController.editBook);

/* GET list book page. */
router.get(
  "/book/list-book",
  autheMiddleware.authenUser,
  bookController.listBook
);

/* GET add book page. */
router.get(
  "/book/add-book",
  autheMiddleware.authenUser,
  bookController.addBookPage
);

/* GET add book page. */
router.post(
  "/book/add-book",
  autheMiddleware.authenUser,
  bookController.addBook
);

/* GET delete book page. */
router.post(
  "/book/delete-book",
  autheMiddleware.authenUser,
  bookController.deleteBook
);

/* GET chart page. */
router.get("/charts", autheMiddleware.authenUser, controllerDef.chart);

/* GET user page. */
router.get("/user/list", autheMiddleware.authenUser, userController.listUser);

//--------------------- POST -------------------------------

/* POST delete user page. */
router.post(
  "/user/delete",
  autheMiddleware.authenUser,
  userController.deleteUser
);

/* POST block user page. */
router.post(
  "/user/block",
  autheMiddleware.authenUser,
  userController.blockUser
);

/* POST block user page. */
router.post(
  "/user/un-block",
  autheMiddleware.authenUser,
  userController.unBlockUser
);

/* POST edit book page. */
router.post(
  "/book/edit",
  autheMiddleware.authenUser,
  bookController.saveEditBook
);

module.exports = router;
