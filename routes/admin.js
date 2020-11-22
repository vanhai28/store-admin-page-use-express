const express = require("express");
const router = express.Router();
const controllerDef = require("../controllers/pagesController");

/* GET home page. */
router.get("/dashboard", controllerDef.index);

/* GET home page. */
router.get("/tables", controllerDef.table);

/* GET home page. */
router.get("/charts", controllerDef.chart);

module.exports = router;
