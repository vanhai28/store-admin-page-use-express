const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
//--------------------- POST -------------------------------

/* POST block user page. */
router.post("/unblock", userController.unBlockUser);

/* POST block user page. */
router.post(
  "/block",

  userController.blockUser
);

/* POST delete user page. */
router.post(
  "/delete",

  userController.deleteUser
);

//--------------------- GET -------------------------------

/* GET user page. */
router.get("/list", userController.listUser);

router.get("/detail", userController.detailUser);

router.get("/api/list", userController.getAPI_ListUser);

module.exports = router;
