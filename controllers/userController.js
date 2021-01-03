const accModel = require("../model/accModel");
const userModel = require("../model/userModel");
const ITEM_PER_PAGE = 5;
module.exports.getAPI_ListUser = async (req, res, next) => {
  const page = +req.query.page || 1;

  const filter = {};

  let listOfUser = await userModel.getListUserByPage(
    filter,
    page,
    ITEM_PER_PAGE
  );

  if (!listOfUser) {
    res.render("pages/user", {});
    return;
  }
  console.log(11111);
  res.statusCode = 200;
  res.send({
    title: "Quản Lí Tài Khoản Khách hàng",
    data: listOfUser,
    // user: listUser,
    // title: "Người dùng",
    // user: listOfUser.docs,
    // hasNextPage: listOfUser.hasNextPage,
    // hasPreviousPage: listOfUser.hasPrevPage > 1,
    // nextPage: listOfUser.nextPage,
    // prevPage: listOfUser.prevPage,
    // lastPage: listOfUser.totalPages,
    // ITEM_PER_PAGE: ITEM_PER_PAGE,
    // currentPage: listOfUser.page,
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
    res.render("pages/user", {});
    return;
  }
  console.log(11111);
  res.render("pages/user", {
    title: "Quản Lí Tài Khoản Khách hàng",
    data: listOfUser,
    // user: listUser,
    // title: "Người dùng",
    // user: listOfUser.docs,
    // hasNextPage: listOfUser.hasNextPage,
    // hasPreviousPage: listOfUser.hasPrevPage > 1,
    // nextPage: listOfUser.nextPage,
    // prevPage: listOfUser.prevPage,
    // lastPage: listOfUser.totalPages,
    // ITEM_PER_PAGE: ITEM_PER_PAGE,
    // currentPage: listOfUser.page,
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
