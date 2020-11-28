const { request } = require("express");
const sessionModel = require("../model/mongooseModel/sessionModel");

exports.authenUser = async (req, res, next) => {
  let req_session = req.session;

  if (!req_session || !req_session.sessionID) {
    res.redirect("/login");
    return;
  }
  const session = await sessionModel.find({ _id: req_session.sessionID });

  if (session.length > 0) {
    next();
  } else {
    res.redirect("/login");
  }
};
