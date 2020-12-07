const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const autheMiddleware = require("../middleware/authenticate");

/* GET home page. */
router.get("/dashboard", pagesController.index);

/* GET table page. */
router.get("/profile", pagesController.profile);

// /* GET chart page. */
// router.get("/charts", pagesController.chart);

module.exports = router;
