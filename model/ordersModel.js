const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const orders = new Schema({
  customerID: String,
  nameCustomer: String,
  address: String,
  phone: String,
  orderCODE: String,
  order_status: String,
  bill: {
    product: Array,
    costBeforAddShippingCost: Number,
    shipping_cost: Number,
    costAfterAddShippingCost: Number,
  },
  date: String,
});

orders.index({ title: "text" });
orders.plugin(mongoosePaginate);
module.exports = mongoose.model("orders", orders);
