const bookModel = require("../model/bookModel");

module.exports.listBook = async function (req, res, next) {
  let listOfBook = await bookModel.getListBook();
  res.render("pages/listOfBook", { title: "Sách", book: listOfBook });
};

module.exports.addBookPage = (req, res, next) => {
  res.render("pages/addBook", { title: "Thêm sách" });
};

module.exports.bookDetail = function (req, res, next) {};
