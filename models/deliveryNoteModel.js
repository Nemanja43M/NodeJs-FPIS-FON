const mongoose = require("mongoose");

const deliveryNoteSchema = mongoose.Schema({
  deliveryNoteId: {
    type: String,
    unique: true,
    required: [true, "DeliveryNote must have an ID"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  employeeId: {
    type: mongoose.Schema.ObjectId,
    ref: "responsiblePerson",
  },
});
deliveryNoteSchema.pre(/^find/, function (next) {
  this.populate({
    path: "employeeId",
    select: "employeeId firstNameLastName",
  });
  next();
});
const deliveryNote = mongoose.model("deliveryNote", deliveryNoteSchema);
module.exports = deliveryNote;
