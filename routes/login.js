const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", authController.login);

router.get("/login", authController.login);

router.post("/logout", authController.logout);

router.post("/auth/admin", (req, res, next) => {
  req.session.sessionID = req.sessionID;
  req.session.cookie.sessionID = req.sessionID;
  authController.authLogin(req, res);
});

module.exports = router;
