const sessionModel = require("../model/mongooseModel/sessionModel");

exports.authenUser = async (req, res, next) => {
  {
    if (!req.session || !req.session.id) {
      res.redirect("/login");
      return;
    }

    let session = await sessionModel.find({ _id: req.session.id });

    if (session[0]) {
      next();
    } else {
      res.redirect("/login");
    }
  }
};
