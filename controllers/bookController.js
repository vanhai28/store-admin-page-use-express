const formidable = require("formidable");

const bookModel = require("../model/bookModel");
const catalog = require("../model/categoryModel");
const upload = require("../service/uploadFile");
const ITEM_PER_PAGE = 20;

module.exports.listBook = async function (req, res, next) {
  let page = +req.query.page || 1;
  let listOfBook = await bookModel.getBookByPage({}, page, ITEM_PER_PAGE);
  let category = await catalog.getAllCategory();

  res.render("pages/listOfBook", {
    title: "Sách",
    book: listOfBook.docs,
    category: category,
    hasNextPage: listOfBook.hasNextPage,
    hasPreviousPage: listOfBook.hasPrevPage > 1,
    nextPage: listOfBook.nextPage,
    prevPage: listOfBook.prevPage,
    lastPage: listOfBook.totalPages,
    ITEM_PER_PAGE: ITEM_PER_PAGE,
    currentPage: listOfBook.page,
  });
};

module.exports.addBookPage = (req, res, next) => {
  res.render("pages/addBook", { title: "Thêm sách" });
};
module.exports.addBook = (req, res, next) => {
  const form = new formidable.IncomingForm({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.send("error " + err);
      return;
    }
    let newBook = fields;
    await upload.uploadFile(files.upload, async (err, urls) => {
      if (err) {
        res.send(err);
      }
      if (urls) {
        newBook.images = urls;
      }

      await upload.uploadFile(Array(files.cover), async (err, url) => {
        if (err) {
          res.send("error when upload cover image" + err);
          return;
        }

        if (url) {
          newBook.cover = url[0];
        }
        const isSucess = await bookModel.addBook(newBook);
        let reesult = "";
        if (isSucess) {
          result = "Thêm thành công";
        } else {
          result = "Có lỗi trong quá trình thêm sách";
        }

        res.render("pages/addBook", {
          titlePage: "Thêm sách",
          result: result,
        });
      });
    });
  });
};

module.exports.deleteBook = async function (req, res, next) {
  if (req.body.id) {
    await bookModel.deleteBook(req.body.id);
    res.statusCode = 200;
    res.send();
  } else {
    res.statusCode = 400;
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
  let newBook = {};
  const form = new formidable.IncomingForm({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.send("error " + err);
      return;
    }
    newBook = fields;

    await upload.uploadFile(files.upload, async (err, urls) => {
      if (err) {
        res.send("err  " + err);
        return;
      }

      if (urls) {
        newBook.images = urls;
      }

      await upload.uploadFile(Array(files.cover), async (err, url) => {
        if (err) {
          res.send("error happen when upload cover image" + err);
          return;
        }

        if (url) {
          newBook.cover = url[0];
        }
        const isSucess = await bookModel.modifyBook(newBook);
        let result = "";

        if (isSucess) {
          result = "Lưu thành công";
        } else {
          result = "Có lỗi trong quá trình lưu";
        }
        res.render("pages/editBook", {
          titlePage: "Chinh sửa sách",
          _id: fields.id,
          title: fields.title,
          author: fields.author,
          category: fields.category,
          price: fields.price,
          old_price: fields.old_price,
          detail: fields.detail,
          result: result,
        });
      });
    });
  });
};
