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

module.exports.updateOrderStatus = async (_id, order_status) => {
  let result = null;

  try {
    result = await orderModel.findByIdAndUpdate(_id, {
      order_status: order_status,
    });
  } catch (error) {
    return error;
  }

  return result;
};
