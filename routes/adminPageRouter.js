const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const autheMiddleware = require("../middleware/authenticate");

/* GET home page. */
router.get("/dashboard", autheMiddleware.authenUser, pagesController.index);

/* GET table page. */
router.get("/profile", autheMiddleware.authenUser, pagesController.profile);

/* GET ORDERS  page. */
router.get(
  "/orders",
  autheMiddleware.authenUser,
  pagesController.renderOrderPage
);

// ---------  API  ----------------

/* GET table page. */
router.get(
  "/api/account",
  autheMiddleware.authenUser,
  pagesController.editInfor
);

/* change avatar . */
router.post(
  "/api/change/avatar",
  autheMiddleware.authenUser,
  pagesController.changeAvatar
);

/* change password . */
router.post(
  "/api/change/password",
  autheMiddleware.authenUser,
  pagesController.changePassword
);

module.exports = router;
