const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  ProductId: {
    type: String,
    unique: true,
    required: [true, "Product must have an ID"],
  },
  ModelName: String,
});

const product = mongoose.model("product", productSchema);
module.exports = product;
