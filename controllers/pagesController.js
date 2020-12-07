module.exports.index = function (req, res, next) {
  res.render("index", {
    title: "Dashboard",
  });
};

module.exports.profile = function (req, res, next) {
  res.render("pages/profileAdmin", {
    title: "Thông tin Admin",
  });
};
