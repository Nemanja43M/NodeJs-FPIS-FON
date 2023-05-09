const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  VehicleId: {
    type: String,
    // required: [true, "The vehicle must have a Id"],
    unique: true,
    trim: true,
    maxlength: [40, "A VehicleId must have less or equal then 40 characters"],
    minlength: [5, "A VehicleId  must have more or equal then 5 characters"],
  },
  NameOfVehicle: String,
});

const vehicle = mongoose.model("vehicle", vehicleSchema);
module.exports = vehicle;
