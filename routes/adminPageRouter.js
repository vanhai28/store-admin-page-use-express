const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const autheMiddleware = require("../middleware/authenticate");

/* GET home page. */
router.get("/dashboard", pagesController.index);

/* GET table page. */
router.get("/profile", pagesController.profile);

// ---------  API  ----------------

/* GET table page. */
router.get("/api/account", pagesController.editInfor);

/* change avatar . */
router.post("/api/change/avatar", pagesController.changeAvatar);

/* change password . */
router.post("/api/change/password", pagesController.changePassword);

module.exports = router;
