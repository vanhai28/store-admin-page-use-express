const orderModel = require("../model/ordersModel");

module.exports.getNewOrderByPage = async (filter, pageIndex, numberItem) => {
  const options = {
    page: pageIndex,
    limit: numberItem,
  };

  let listOrders;

  await orderModel.paginate(filter, options, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      listOrders = result;
    }
  }); //add auther

  return listOrders;
};
