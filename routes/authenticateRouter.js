const express = require("express");
const router = express.Router();
const authController = require("../controllers/authenticationController");
const authenticate = require("../middleware/authenticate");

router.get("/", authController.login);

router.get("/login", authController.login);

router.post("/logout", authenticate.authenUser, authController.logout);

router.post("/login", authController.authLogin);

router.get("/recovery/password", authController.recoverPassword);

router.get("/get/verify/code", authController.getVerifyCode);

router.post("/recovery/password", authController.sendVerifyCode);

router.post("/reset/password", authController.resetPassword);

module.exports = router;
