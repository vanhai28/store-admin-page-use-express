const formidable = require("formidable");
const bookModel = require("../services/bookService");
const catalog = require("../services/categoryService");
const upload = require("../services/uploadFile");
const ITEM_PER_PAGE = 10;
const numberService = require("../services/numberService");
/**
 * Render list Books Page
 * @param {*} req request from client
 * @param {*} res response from server
 * @param {*} next callback function
 */
module.exports.RenderListBookPage = async function (req, res, next) {
  const page = +req.query.page || 1;
  let currCategoryView = undefined;
  const filter = { isDelete: false };
  const listCategory = await catalog.getAllCategory();

  //get infomation of current category
  if (req.query.idCat) {
    filter.idCategory = req.query.idCat;

    listCategory.forEach((cat) => {
      if (req.query.idCat == cat._id) {
        currCategoryView = cat;
        return true;
      }
    });
  }

  let listOfBook = await bookModel.getBooksByPage(filter, page, ITEM_PER_PAGE);
  for (let index = 0; index < listOfBook.docs.length; index++) {
    let price = listOfBook.docs[index].price;

    //re-format
    price = numberService.formatNumber(price);
    listOfBook.docs[index].priceString = price + " ";
  }

  res.render("pages/listOfBook", {
    title: "Sách",
    listBook: listOfBook,
    category: listCategory,
    curentCategoryView: currCategoryView,
  });
};
/**
 * Return books at specifical page
 * @param {*} req request from client
 * @param {*} res response from server
 * @param {*} next callback function
 */
module.exports.getAPIBook = async function (req, res, next) {
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

  let listOfBook = await bookModel.getBooksByPage(filter, page, ITEM_PER_PAGE);

  let NotFirstPage = listOfBook.nextPage > 2;
  let NotLastPage = !(listOfBook.page == listOfBook.totalPages);

  res.statusCode = 200;

  res.send({
    listBook: listOfBook,
    curentCategoryView: currCategoryView,
    NotFirstPage: NotFirstPage,
    NotLastPage: NotLastPage,
  });
};
/**
 * Render Add Book Page
 * @param {*} req request from client
 * @param {*} res response from server
 * @param {*} next callback function
 */
module.exports.RenderAddBookPage = async (req, res, next) => {
  let categoryList = await catalog.getAllCategory();

  res.render("pages/addBook", {
    titlePage: "Thêm sách",
    catalog: categoryList,
  });
};

/**
 * save a new Book
 * @param {*} req request from client
 * @param {*} res response from server
 * @param {*} next callback function
 */
module.exports.SaveNewBook = (req, res, next) => {
  const form = new formidable.IncomingForm({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.send("error " + err);
      return;
    }

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

/**
 * set isDelete attribute of book is true
 * @param {*} req request from client
 * @param {*} res response from server
 * @param {*} next callback function
 */
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
/**
 * Render edit book page
 * @param {req} req request from client
 * @param {res} res response from server
 * @param {next} next callback function
 */
module.exports.RenderEditBookPage = async function (req, res, next) {
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
/**
 *  save changed information of book
 * @param {} req request from client
 * @param {*} res response of server
 * @param {*} next callback function
 */
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
/**
 *
 * @param {*} req request from client
 * @param {*} res response from server
 * @param {*} next callback function
 */
module.exports.searchBook = async (req, res, next) => {
  const listCategory = await catalog.getAllCategory();
  let currCategoryView = undefined;
  const filter = { isDelete: false };

  //get infomation of current category
  if (req.query.idCat) {
    filter.idCategory = req.query.idCat;

    listCategory.forEach((cat) => {
      if (req.query.idCat == cat._id) {
        currCategoryView = cat;
        return true;
      }
    });
  }
  let value = req.query.value || "";
  let listOfBook = await bookModel.searchBook(value);

  let mesg = "tìm thấy " + listOfBook.docs.length + " kết quả";

  res.render("pages/listOfBook", {
    title: "Sách",
    listBook: listOfBook,
    category: listCategory,
    curentCategoryView: currCategoryView,
    mesg: mesg,
  });
};

/**
 *
 * @param {*} req request from client
 * @param {*} res response from server
 * @param {*} next callback function
 */
module.exports.getAllCategory = async (req, res, next) => {
  const listCategory = await catalog.getAllCategory();

  if (listCategory) {
    res.statusCode = 200;
    res.send(listCategory);
  } else {
    res.statusCode = 404;
    res.send("error when get data");
  }
};
