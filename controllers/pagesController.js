const accountModel = require("../services/accountService");
const userService = require("../services/userService");
const orderService = require("../services/orderServices");

const ITEM_PER_PAGE = 10;

//Render page dashboard
module.exports.index = async function (req, res, next) {
  let listOfUser = await userService.getListUserByPage({}, 1, ITEM_PER_PAGE);

  res.render("index", {
    title: "Dashboard",
    data: listOfUser,
  });
};

module.exports.renderOrderPage = async function (req, res, next) {
  const page = +req.query.page || 1;

  const filter = {};

  let listOrder = await orderService.getNewOrderByPage(
    filter,
    page,
    ITEM_PER_PAGE
  );

  res.render("pages/orders", {
    listOrder: listOrder,
    title: "Dashboard",
  });
};

module.exports.getAPIOrders = async function (req, res, next) {
  const page = +req.query.page || 1;

  const filter = {};

  let listOrder = await orderService.getNewOrderByPage(
    filter,
    page,
    ITEM_PER_PAGE
  );

  let NotFirstPage = listOrder.nextPage > 2;
  let NotLastPage = !(listOrder.page == listOrder.totalPages);
  console.log(listOrder);
  res.statusCode = 200;

  res.send({
    listOrder: listOrder,
    NotFirstPage: NotFirstPage,
    NotLastPage: NotLastPage,
  });
};
///////

module.exports.profile = async function (req, res, next) {
  let account = await accountModel.getAccountInfor();

  res.render("pages/profileAdmin", {
    title: "Thông tin Admin",
    account,
  });
};

module.exports.editInfor = async (req, res, next) => {
  if (!req.param) {
    res.statusCode = 404;
    res.send();
    return;
  }
  let result = await accountModel.saveAccountInfor(
    req.query.field,
    req.query.value
  );
  res.statusCode = 200;

  if (!result) {
    res.statusCode = 500;
  }

  res.send();
};

module.exports.changeAvatar = async function (req, res, next) {
  await accountModel.changeAvatar(req, (result, url) => {
    if (result) {
      res.statusCode = 200;
      res.send(url[0]);
    } else {
      res.statusCode = 500;
      res.send(null);
    }
  });
};
module.exports.changePassword = async function (req, res, next) {
  let result = await accountModel.changePassword(req);

  if (result) {
    res.statusCode = 200;
    res.send();
  } else {
    res.statusCode = 500;
    res.send();
  }
};
