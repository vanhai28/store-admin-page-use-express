const express = require("express");
const router = express.Router();
const controllerDef = require("../controllers/pagesController");
const autheMiddleware = require("../middleware/authenticate");

/* GET home page. */
router.get("/dashboard", controllerDef.index);

/* GET home page. */
router.get("/tables", controllerDef.table);

/* GET home page. */
router.get("/charts", autheMiddleware.authenUser, controllerDef.chart);

module.exports = router;
