const orderService = require("../services/orderServices");
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
