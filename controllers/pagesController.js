module.exports.index = function (req, res, next) {
  res.render("index", {
    title: "Dashboard",
  });
};

module.exports.table = function (req, res, next) {
  res.render("pages/tables", {
    title: "Tables",
  });
};

module.exports.chart = function (req, res, next) {
  res.render("pages/chart", {
    title: "Chart",
  });
};
