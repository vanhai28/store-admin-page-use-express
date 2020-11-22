const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/login", authController.login);

router.post("/auth/login", authController.authLoginUser);

/* GET home page. */
router.get("/recover-password", authController.recoverPassword);

module.exports = router;
