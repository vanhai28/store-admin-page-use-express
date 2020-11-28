const bookModel = require("../model/bookModel");

module.exports.listBook = async function (req, res, next) {
  let listOfBook = await bookModel.getListBook();
  res.render("pages/listOfBook", { title: "Sách", book: listOfBook });
};

module.exports.addBookPage = (req, res, next) => {
  res.render("pages/addBook", { title: "Thêm sách" });
};
module.exports.addBook = (req, res, next) => {
  let isSucess = bookModel.addBook(req.body);
  if (isSucess) {
    res.render("pages/addBook", {
      title: "Thêm sách",
      result: "Thêm thành công",
    });
  } else {
    res.render("pages/addBook", {
      title: "Thêm sách",
      result: "Thêm Thất bại",
    });
  }
};

module.exports.deleteBook = function (req, res, next) {
  console.log("req delete ", req.body);

  if (req.body.id) {
    bookModel.deleteBook(req.body.id);
    res.statusCode = 200;
    res.send();
  } else {
    res.statusCode = 404;
    res.send();
  }
};
