const bookModel = require("../model/bookModel");
const catalog = require("../model/categoryModel");

module.exports.listBook = async function (req, res, next) {
  let listOfBook = await bookModel.getListBook();
  let category = await catalog.getAllCategory();

  res.render("pages/listOfBook", {
    title: "Sách",
    book: listOfBook,
    category: category,
  });
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

module.exports.editBook = async function (req, res, next) {
  let id = req.query.id;
  let book = await bookModel.getOneBook(id);

  if (!book) {
    res.send("cannot find book ", id);
    return;
  }

  res.render("pages/editBook", {
    titlePage: "Chỉnh sửa thông tin sách",
    _id: book._id,
    title: book.title,
    author: book.author.join(", "),
    category: book.category,
    price: book.price,
    old_price: book.old_price,
    detail: book.detail,
    images: book.images.join(" , "),
    cover: book.cover,
  });
};

module.exports.saveEditBook = async (req, res, next) => {
  console.log("body ", req.body);

  await bookModel.modifyBook(req.body.id, req.body);
  res.redirect("/admin/book/list-book");
};
