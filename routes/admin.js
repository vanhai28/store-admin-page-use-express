const express = require("express");
const router = express.Router();
const controllerDef = require("../controllers/pagesController");
const autheMiddleware = require("../middleware/authenticate");
const bookController = require("../controllers/bookController");
const userController = require("../controllers/userController");
const sessionModel = require("../model/mongooseModel/sessionModel");

/* GET home page. */
router.get("/dashboard", controllerDef.index);

// /* GET table page. */
// router.get("/tables", controllerDef.table);

/* GET edit book page. */
router.get("/book/edit", bookController.editBook);

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

//--------------------- POST -------------------------------

/* POST delete user page. */
router.post("/user/delete", userController.deleteUser);

/* POST user page. */
router.post("/user/delete", userController.deleteUser);

/* POST edit book page. */
router.post("/book/edit", bookController.saveEditBook);

module.exports = router;
