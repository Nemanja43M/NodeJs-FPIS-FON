const mongoose = require("mongoose");

const ItemDeliverySchema = mongoose.Schema({
  orderId: String,
  deliveryNoteId: {
    type: mongoose.Schema.ObjectId,
    ref: "deliveryNote",
  },
  Description: String,
  Quantity: {
    type: Number,
    required: [true, "DeliveryNote must have an Quantity"],
  },
  ProductId: {
    type: mongoose.Schema.ObjectId,
    ref: "product",
  },
});
ItemDeliverySchema.pre(/^find/, function (next) {
  this.populate({
    path: "ProductId",
    select: "ProductId  ModelName",
  });
  next();
});
ItemDeliverySchema.pre(/^find/, function (next) {
  this.populate({
    path: " deliveryNoteId",
    select: "deliveryNoteId",
  });
  next();
});

const ItemDelivery = mongoose.model("ItemDelivery", ItemDeliverySchema);
module.exports = ItemDelivery;
