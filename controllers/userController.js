const accModel = require("../model/accModel");
const userModel = require("../model/userModel");

module.exports.listUser = async (req, res, next) => {
  const listUser = await userModel.getListUser();
  res.render("pages/user", {
    title: "Quản Lí Tài Khoản Khách hàng",
    user: listUser,
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
