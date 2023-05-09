const mongoose = require("mongoose");

const PurchaseOrderSchema = mongoose.Schema({
  PurchaseOrderCode: String,
  Date: Date,
  Note: String,
  PIBBuys: String,
  PIBReceives: String,
  PIBPays: String,
  employeeId: {
    type: mongoose.Schema.ObjectId,
    ref: "responsiblePerson",
  },
  deliveryNoteId: {
    type: mongoose.Schema.ObjectId,
    ref: "deliveryNote",
  },
});
PurchaseOrderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "employeeId",
    select: "employeeId  firstNameLastName",
  });
  next();
});

const PurchaseOrder = mongoose.model("PurchaseOrder", PurchaseOrderSchema);
module.exports = PurchaseOrder;
