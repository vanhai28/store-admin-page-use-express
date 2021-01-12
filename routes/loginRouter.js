const express = require("express");
const router = express.Router();
const authController = require("../controllers/authenticationController");
const authenticate = require("../middleware/authenticate");

router.get("/", authController.login);

router.get("/login", authController.login);

router.post("/logout", authenticate.authenUser, authController.logout);

router.post("/login", authController.authLogin);

module.exports = router;
