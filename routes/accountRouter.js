const express = require("express");
const router = express.Router();

const autheMiddleware = require("../middleware/authenticate");
const accountController = require("../controllers/accountController");

/* GET table page. */
router.get("/profile", autheMiddleware.authenUser, accountController.profile);

// ---------  API  ----------------

/* GET table page. */
router.get(
  "/api/account",
  autheMiddleware.authenUser,
  accountController.editInfor
);

/* change avatar . */
router.post(
  "/api/change/avatar",
  autheMiddleware.authenUser,
  accountController.changeAvatar
);

/* change password . */
router.post(
  "/api/change/password",
  autheMiddleware.authenUser,
  accountController.changePassword
);

module.exports = router;
