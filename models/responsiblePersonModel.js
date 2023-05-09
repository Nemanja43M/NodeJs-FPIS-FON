const mongoose = require("mongoose");
const validator = require("validator");
const responsiblePersonSchema = mongoose.Schema({
  employeeId: {
    type: String,
    required: [true, "Employee must have an ID"],
    trim: true,
    maxlength: [40, "A VehicleId must have less or equal then 40 characters"],
    minlength: [5, "A VehicleId  must have more or equal then 5 characters"],
  },
  firstNameLastName: {
    type: String,
    required: [true, "Employee must have an ID"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  MarketId: Number,
});
const responsiblePerson = mongoose.model(
  "responsiblePerson",
  responsiblePersonSchema
);
module.exports = responsiblePerson;
