const accountModel = require("../model/accModel");

module.exports.index = function (req, res, next) {
  res.render("index", {
    title: "Dashboard",
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
