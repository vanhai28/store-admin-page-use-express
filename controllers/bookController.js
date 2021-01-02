const formidable = require("formidable");
const bookModel = require("../model/bookModel");
const catalog = require("../model/categoryModel");
const upload = require("../service/uploadFile");
const ITEM_PER_PAGE = 10;

module.exports.listBook = async function (req, res, next) {
  const page = +req.query.page || 1;
  let currCategoryView = undefined;
  const filter = { isDelete: false };
  const listCategory = await catalog.getAllCategory();

  if (req.query.idCat) {
    filter.idCategory = req.query.idCat;

    listCategory.forEach((cat) => {
      if (req.query.idCat == cat._id) {
        currCategoryView = cat;
        return true;
      }
    });
  }

  let listOfBook = await bookModel.getBookByPage(filter, page, ITEM_PER_PAGE);

  res.render("pages/listOfBook", {
    title: "Sách",
    book: listOfBook.docs,
    category: listCategory,
    hasNextPage: listOfBook.hasNextPage,
    hasPreviousPage: listOfBook.hasPrevPage > 1,
    nextPage: listOfBook.nextPage,
    prevPage: listOfBook.prevPage,
    lastPage: listOfBook.totalPages,
    ITEM_PER_PAGE: ITEM_PER_PAGE,
    currentPage: listOfBook.page,
    curentCategoryView: currCategoryView,
  });
};

module.exports.getAPIBook = async function (req, res, next) {
  console.log("satus ", res.statusCode);
  const page = +req.query.page || 1;
  let currCategoryView = undefined;
  const filter = { isDelete: false };
  const listCategory = await catalog.getAllCategory();

  if (req.query.idCat != 0) {
    filter.idCategory = req.query.idCat;

    listCategory.forEach((cat) => {
      if (req.query.idCat == cat._id) {
        currCategoryView = cat;
        return true;
      }
    });
  }

  let listOfBook = await bookModel.getBookByPage(filter, page, ITEM_PER_PAGE);
  let NotFirstPage = listOfBook.nextPage > 2;
  let NotLastPage = !(listOfBook.page == listOfBook.totalPages);
  //let hasPrevPage = listOfBook.hasPrevPage > 1;
  res.statusCode = 200;
  console.log("satus ", res.statusCode);
  res.send({
    book: listOfBook.docs,
    hasNextPage: listOfBook.hasNextPage,
    hasPreviousPage: listOfBook.hasPrevPage,
    nextPage: listOfBook.nextPage,
    prevPage: listOfBook.prevPage,
    lastPage: listOfBook.totalPages,
    ITEM_PER_PAGE: ITEM_PER_PAGE,
    currentPage: listOfBook.page,
    curentCategoryView: currCategoryView,
    NotFirstPage: NotFirstPage,
    NotLastPage: NotLastPage,
  });
};

module.exports.addBookPage = async (req, res, next) => {
  let categoryList = await catalog.getAllCategory();

  res.render("pages/addBook", {
    titlePage: "Thêm sách",
    catalog: categoryList,
  });
};
module.exports.addBook = (req, res, next) => {
  const form = new formidable.IncomingForm({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.send("error " + err);
      return;
    }
    // res.send(fields);
    // return;
    let newBook = fields;
    let images = files.upload;

    if (!images[0]) {
      // images is not an Array
      images = Array(images);
    }

    await upload.uploadFile(images, async (err, urls) => {
      if (err) {
        res.send(err);
      }
      if (urls) {
        newBook.images = urls;
      }

      await upload.uploadFile(Array(files.coverImage), async (err, url) => {
        if (err) {
          res.send("error when upload cover image" + err);
          return;
        }

        if (url) {
          // upload sucess
          newBook.cover = url[0];
        }
        const isSucess = await bookModel.addBook(newBook);
        let result = "";

        if (isSucess) {
          result = "Thêm thành công";
        } else {
          result = "Có lỗi trong quá trình thêm sách";
        }

        let categoryList = await catalog.getAllCategory();
        res.render("pages/addBook", {
          titlePage: "Thêm sách",
          result: result,
          catalog: categoryList,
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
  let _id = req.query.id;
  let book = await bookModel.getOneBook(_id);
  let categoryList = await catalog.getAllCategory();
  if (!book) {
    res.send("cannot find book " + _id);
    return;
  }

  res.render("pages/editBook", {
    titlePage: "Chỉnh sửa thông tin sách",
    book: book,
    catalog: categoryList,
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

        let currentBook = await bookModel.getOneBook(newBook._id);
        let categoryList = await catalog.getAllCategory();

        res.render("pages/editBook", {
          titlePage: "Chinh sửa sách",
          book: currentBook,
          result: result,
          catalog: categoryList,
        });
      });
    });
  });
};

module.exports.searchBook = async (req, res, next) => {
  const listCategory = await catalog.getAllCategory();

  let value = req.query.value || "";
  let listOfBook = await bookModel.searchBook(value);

  let mesg = "tìm thấy " + listOfBook.docs.length + " kết quả";

  res.render("pages/listOfBook", {
    title: "Sách",
    book: listOfBook.docs,
    category: listCategory,
    hasNextPage: listOfBook.hasNextPage,
    hasPreviousPage: listOfBook.hasPrevPage > 1,
    nextPage: listOfBook.nextPage,
    prevPage: listOfBook.prevPage,
    lastPage: listOfBook.totalPages,
    ITEM_PER_PAGE: ITEM_PER_PAGE,
    currentPage: 1,
    curentCategoryView: "",
    mesg: mesg,
  });
};
