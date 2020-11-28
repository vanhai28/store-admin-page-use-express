const { request } = require("express");
const sessionModel = require("../model/mongooseModel/sessionModel");

exports.authenUser = async (req, res, next) => {
  {
    let cookie = req.session.cookie;
    console.log("cookie ", cookie);
    if (!cookie || !cookie.sessionID) {
      console.log("da log");
      res.redirect("/login");
      return;
    }
    console.log("sessID ", cookie.sessionID);
    const session = await sessionModel.find({ _id: cookie.sessionID });
    console.log("kich thuoc ", session.length, "  ", session);
    if (session.length > 0) {
      next();
    } else {
      res.redirect("/login");
    }
  }
};
