const accModel = require("../services/accountService");
const userModel = require("../services/userService");
const ITEM_PER_PAGE = 10;
module.exports.getAPI_ListUser = async (req, res, next) => {
  const page = +req.query.page || 1;
  const filter = {};

  let listOfUser = await userModel.getListUserByPage(
    filter,
    page,
    ITEM_PER_PAGE
  );

  if (!listOfUser) {
    res.render("pages/users/user", {});
    return;
  }

  res.statusCode = 200;
  res.send({
    title: "Quản Lí Tài Khoản Khách hàng",
    data: listOfUser,
  });
};

module.exports.listUser = async (req, res, next) => {
  const page = +req.query.page || 1;
  const filter = {};

  let listOfUser = await userModel.getListUserByPage(
    filter,
    page,
    ITEM_PER_PAGE
  );

  if (!listOfUser) {
    res.render("pages/users/user", {});
    return;
  }

  res.render("pages/users/user", {
    title: "Quản Lí Tài Khoản Khách hàng",
    data: listOfUser,
  });
};

module.exports.detailUser = async (req, res) => {
  const userId = req.query.id;
  const user = await userModel.getUser(userId);
  res.render("pages/users/userInformation", {
    user,
  });
};

module.exports.deleteUser = async (req, res, next) => {
  let isSuccess = await userModel.removeUserAcc(req.body.id);

  if (isSuccess) {
    res.statusCode = 200;
    res.send();
  } else {
    res.statusCode = 500;
    res.send("an error happen when remove account");
  }
};

module.exports.blockUser = async (req, res, next) => {
  let isSuccess = await userModel.blockAccount(req.body.id);

  if (isSuccess) {
    res.statusCode = 200;
    res.send();
  } else {
    res.statusCode = 500;
    res.send("an error happen when updating status");
  }
};

module.exports.unBlockUser = async (req, res, next) => {
  let isSuccess = await userModel.unBlockAccount(req.body.id);

  if (isSuccess) {
    res.statusCode = 200;
    res.send();
  } else {
    res.statusCode = 500;
    res.send("an error happen when updating status");
  }
};
