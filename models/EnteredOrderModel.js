const mongoose = require("mongoose");

const EnteredOrderSchema = mongoose.Schema({
  employeeID: String,
  firstLastName: String,
  deliveryNote: String,
  date: Date,
  productID: String,
  modelName: String,
  orderID: String,
  amount: Number,
  description: String,
});

const EnteredOrder = mongoose.model("EnteredOrder", EnteredOrderSchema);
module.exports = EnteredOrder;
