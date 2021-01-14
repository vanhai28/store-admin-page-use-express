const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const autheMiddleware = require("../middleware/authenticate");
//--------------------- POST -------------------------------

/* POST block user page. */
router.post("/unblock", autheMiddleware.authenUser, userController.unBlockUser);

/* POST block user page. */
router.post("/block", autheMiddleware.authenUser, userController.blockUser);

/* POST delete user page. */
router.post("/delete", autheMiddleware.authenUser, userController.deleteUser);

//--------------------- GET -------------------------------

/* GET user page. */
router.get("/list", autheMiddleware.authenUser, userController.listUser);

router.get("/detail", userController.detailUser);

router.get(
  "/api/list",
  autheMiddleware.authenUser,
  userController.getAPI_ListUser
);

module.exports = router;
