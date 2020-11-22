const authModel = require("../model/authModel");

module.exports.login = function (req, res, next) {
  res.render("pages/login", {
    layout: "loginLayout",
    title: "Login",
  });
};
module.exports.recoverPassword = function (req, res, next) {
  res.render("pages/recoveryPassword", {
    layout: "loginLayout",
    title: "Recovery Password",
  });
};

exports.authLoginUser = async (req, res, next) => {
  const emailOrUserName = req.body.emailOrUserName;

  const pass = req.body.password;
  const err = await authModel.authLoginAcc(emailOrUserName, pass);

  if (err) {
    res.render("pages/login", { title: "Login", err: err });
  } else {
    res.redirect("/");
  }
};
