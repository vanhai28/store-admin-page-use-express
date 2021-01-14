const mongoose = require("mongoose");
const { Schema } = mongoose;

const orders = new Schema({
  customerID: String,
  nameCustomer: String,
  address: String,
  phone: String,
  bill: {
    product: Array,
    costBeforAddShippingCost: Number,
    shipping_cost: Number,
    costAfterAddShippingCost: Number,
  },
});

module.exports = mongoose.model("orders", orders);
