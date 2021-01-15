const bcrypt = require("bcrypt");
const randomstring = require("randomstring");

const authModel = require("../services/authenticationService");
const accModel = require("../model/adminModel");
const mailer = require("../misc/mailer");

module.exports.login = function (req, res, next) {
  res.render("pages/admin/login", {
    layout: "loginLayout",
    title: "Login",
  });
};
module.exports.recoverPassword = function (req, res, next) {
  res.render("pages/admin/recoveryPassword", {
    layout: "loginLayout",
    title: "Recovery Password",
  });
};
module.exports.getVerifyCode = function (req, res, next) {
  res.render("pages/admin/authRecoverPass", {
    layout: "loginLayout",
    title: "Recovery Password",
  });
};

exports.authLogin = async (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;

  const acc = await authModel.authLoginAcc(email, pass);

  if (!acc) {
    res.render("pages/admin/login", {
      title: "Login",
      err: "Username and password is not match",
      layout: "loginLayout",
      title: "Login",
    });
  } else {
    req.session.userId = acc._id;
    req.session.username = acc.name;
    req.session.sessionID = req.sessionID;
    //req.session.cookie.sessionID = req.sessionID;
    res.redirect("/admin/dashboard");
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy(function (err) {
    console.log(err);
  });
  res.clearCookie(process.env.SESS_NAME);
  res.redirect("/login");
};

module.exports.sendVerifyCode = async (req, res, next) => {
  let email = req.query.email;
  let isExist = await accModel.exists({ email: email });
  if (!isExist) {
    res.statusCode = 404;
    res.send();
    return;
  }

  const verifyToken = randomstring.generate(7);

  await accModel.updateOne({ email: email }, { verify_token: verifyToken });
  const html = `Chào bạn,
  <br/>
  Hệ thống ghi nhận yêu cầu khôi phục lại mật khẩu của bạn.
  <br/>
  Mã xác thực là: <b>${verifyToken}</b>
  <br/>
  Vui lòng nhập mã trên tại trang xác thực.
  <br/><br/>
  Xin chân thành cảm ơn,
  <br/>
  Bookstore
  `;
  mailer.sendEmail("admin@bookstore.com", email, "Khôi phục mật khẩu", html);

  res.statusCode = 200;
  res.send();
};

module.exports.resetPassword = async (req, res, next) => {
  let verifyCode = req.query.verify_code;
  let acc = await accModel.find({ verify_token: verifyCode });

  if (acc.length == 0) {
    res.statusCode = 404;
    res.send();
    return;
  }

  const newPassword = randomstring.generate(10);
  const userEmail = acc[0].email;

  const saltRounds = 10;
  await bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(newPassword, salt, async (err, hash) => {
      await accModel.findByIdAndUpdate(acc[0]._id, {
        password: hash,
        verify_token: null,
      });
    });
  });

  const html = `Chào bạn,
  <br/>
  Mật khẩu tài khoản của bạn đã được reset.
  <br/>
  Mật khẩu mới: <b>${newPassword}</b>
  <br/>
  Vui lòng mật khẩu mới để tiếp tục sử dụng dịch vụ của chúng tôi.
  <br/><br/>
  Xin chân thành cảm ơn,
  <br/>
  Bookstore
  `;
  mailer.sendEmail("admin@bookstore.com", userEmail, "Reset Mật khẩu", html);
  res.statusCode = 200;
  res.send();
};
