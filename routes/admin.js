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

/* GET chart page. */
router.get(
  "/charts",
  async (req, res, next) => {
    {
      let req_session = req.session;
      console.log("cookie ", req_session.cookie);
      if (!req_session || !req_session.sessionID) {
        console.log("da log");
        res.redirect("/login");
        return;
      }
      console.log("sessID ", req_session.sessionID);
      const session = await sessionModel.find({ _id: req_session.sessionID });
      console.log("kich thuoc ", session.length, "  ", session);
      if (session.length > 0) {
        next();
      } else {
        res.redirect("/login");
      }
    }
  },
  controllerDef.chart
);

/* GET user page. */
router.get("/user/list", userController.listUser);

module.exports = router;
