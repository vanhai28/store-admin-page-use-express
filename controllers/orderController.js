const orderService = require("../services/orderServices");
const orderModel = require("../model/ordersModel");

const ITEM_PER_PAGE = 10;
module.exports.renderOrderPage = async function (req, res, next) {
  const page = +req.query.page || 1;

  const filter = {};

  let listOrder = await orderService.getNewOrderByPage(
    filter,
    page,
    ITEM_PER_PAGE
  );

  res.render("pages/orders", {
    listOrder: listOrder,
    title: "Dashboard",
  });
};

module.exports.getAPIOrders = async function (req, res, next) {
  const page = +req.query.page || 1;

  const filter = {};

  let listOrder = await orderService.getNewOrderByPage(
    filter,
    page,
    ITEM_PER_PAGE
  );

  let NotFirstPage = listOrder.nextPage > 2;
  let NotLastPage = !(listOrder.page == listOrder.totalPages);

  res.statusCode = 200;

  res.send({
    listOrder: listOrder,
    NotFirstPage: NotFirstPage,
    NotLastPage: NotLastPage,
  });
};
module.exports.updateStatusOrder = async (req, res, next) => {
  let _id = req.query._id;
  let order_status = req.query.order_status;

  if (!_id || !order_status) {
    res.status = 400;
    res.send();
  }

  await orderService.updateOrderStatus(_id, order_status);

  res.statusCode = 200;

  res.send();
};

module.exports.getDataForChart = async (req, res) => {
  let orders = await orderModel.find({});
  let dateLabel = [];
  let data = [];

  for (let index = 0; index < orders.length; index++) {
    const element = orders[index];
    //get date
    let dateOrder = element.date.slice(0, 15);

    let numberProduct = 0;
    //get number of product
    element.bill.product.forEach((element) => {
      numberProduct += element.quantity;
    });

    //------ grouping by date ---------------

    let i = dateLabel.indexOf(dateOrder);

    if (i >= 0) {
      data[i] += numberProduct;
    } else {
      dateLabel.push(dateOrder);
      data.push(0);
      data[data.length - 1] += numberProduct;
    }
    //-----------------------------------
  }

  res.statusCode = 200;
  res.send({ label: dateLabel, data: data });
};
