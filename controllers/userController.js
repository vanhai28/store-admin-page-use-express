const accModel = require("../model/accModel");
const userModel = require("../model/userModel");

module.exports.listUser = async (req, res, next) => {
  const listUser = await userModel.getListUser();
  res.render("pages/user", {
    title: "Quản Lí Tài Khoản Khách hàng",
    user: listUser,
  });
};
