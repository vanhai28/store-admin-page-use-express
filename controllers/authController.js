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

exports.authLogin = async (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;

  const acc = await authModel.authLoginAcc(email, pass);

  if (!acc) {
    //res.json(err);
    res.render("pages/login", {
      title: "Login",
      err: "Username and password is not match",
      layout: "loginLayout",
      title: "Login",
    });
  } else {
    req.session.userId = acc._id;
    req.session.username = acc.name;
    req.session.sessionID = req.sessionID;
    res.redirect("/admin/dashboard");
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy(function (err) {
    console.log(err);
  });

  res.redirect("/login");
};
