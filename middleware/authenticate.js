const { request } = require("express");
const sessionModel = require("../model/mongooseModel/sessionModel");

exports.authenUser = async (req, res, next) => {
  {
    console.log("co0kie ", res.cookie);
    if (!res.cookie || !res.cookie.sessionID) {
      console.log("da log");
      res.redirect("/login");
      return;
    }
    console.log("sessID ", res.cookie.sessionID);
    const session = await sessionModel.find({ _id: res.cookie.sessionID });
    console.log("kich thuoc ", session.length, "  ", session);
    if (session.length > 0) {
      next();
    } else {
      res.redirect("/login");
    }
  }
};
