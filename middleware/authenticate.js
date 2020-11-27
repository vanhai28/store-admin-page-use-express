const { request } = require("express");
const sessionModel = require("../model/mongooseModel/sessionModel");

exports.authenUser = async (req, res, next) => {
  {
    if (!req.session || !req.session.id) {
      console.log("da log");
      res.redirect("/login");
      return;
    }

    const session = await sessionModel.find({ _id: req.sessionID });
    console.log("kich thuoc ", session.length, "  ", session);
    if (session.length > 0) {
      next();
    } else {
      res.redirect("/login");
    }
  }
};
