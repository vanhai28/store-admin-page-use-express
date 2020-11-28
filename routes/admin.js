const express = require("express");
const router = express.Router();
const controllerDef = require("../controllers/pagesController");
const autheMiddleware = require("../middleware/authenticate");
const bookController = require("../controllers/bookController");
const userController = require("../controllers/userController");
const sessionModel = require("../model/mongooseModel/sessionModel");

/* GET home page. */
router.get("/dashboard", controllerDef.index);

/* GET table page. */
router.get("/tables", controllerDef.table);

/* GET edit book page. */
router.get("/book/edit/:id", controllerDef.table);

/* GET list book page. */
router.get("/book/list-book", bookController.listBook);

/* GET add book page. */
router.get("/book/add-book", bookController.addBookPage);

/* GET add book page. */
router.post("/book/add-book", bookController.addBook);

/* GET delete book page. */
router.post("/book/delete-book", bookController.deleteBook);

/* GET chart page. */
router.get("/charts", autheMiddleware.authenUser, controllerDef.chart);

/* GET user page. */
router.get("/user/list", userController.listUser);

/* GET delete user  page. */
router.post("/user/delete", userController.deleteUser);

/* GET block user page. */
router.post("/user/block", userController.blockUser);

/* GET un-block user page. */
router.post("/user/un-block", userController.unBlockUser);

module.exports = router;
