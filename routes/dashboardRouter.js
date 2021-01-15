const express = require("express");
const router = express.Router();

const autheMiddleware = require("../middleware/authenticate");
const dashboardController = require("../controllers/dashboardController");

/* GET home page. */
router.get("/dashboard", autheMiddleware.authenUser, dashboardController.index);

module.exports = router;
