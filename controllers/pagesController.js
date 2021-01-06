const accountModel = require("../model/accModel");
const userModel = require("../model/userModel");
const ITEM_PER_PAGE = 5;
//Render page dashboard
module.exports.index = async function (req, res, next) {
  let listOfUser = await userModel.getListUserByPage({}, 1, ITEM_PER_PAGE);

  res.render("index", {
    title: "Dashboard",
    data: listOfUser,
  });
};

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
