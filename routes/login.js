const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", authController.login);

router.get("/bar", function (req, res, next) {
  var someAttribute = req.session.someAttribute;
  res.send(`This will print the attribute I set earlier: ${someAttribute}`);
});

router.get("/login", authController.login);

router.post("/logout", authController.logout);

router.post("/auth/admin", (req, res, next) => {
  req.session.sessionID = req.sessionID;
  req.session.cookie.sessionID = req.sessionID;
  console.log("session in login ", req.session);
  authController.authLogin(req, res);
});

module.exports = router;
