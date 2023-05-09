const vehicle = require("../models/vehicleModel");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.getAllVehicles = async (req, res) => {
  try {
    const features = new ApiFeatures(vehicle.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();
    const allData = await features.query;

    res.status(200).json({
      status: "success",
      results: allData.length,
      data: allData,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      messagge: "Err",
    });
  }
};
exports.createVehicle = catchAsync(async (req, res, next) => {
  if (!req.body.VehicleId || !req.body.NameOfVehicle) {
    return res.status(400).send("Invalid data");
  }
  try {
    await vehicle.create(req.body);
    return res.status(201);
  } catch (e) {
    console.log(e);
  }
  // if (!data) {
  //   return next(new appError("Bad request", 400));
  // }
  // res.status(201).json({
  //   status: "success",
  //   data: data,
  // });
});
exports.getOne = catchAsync(async (req, res, next) => {
  const data = await vehicle.findById(req.params.id);
  if (!data) {
    return next(new appError("No tour found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: data,
  });
});
exports.updateOne = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const updateData = await vehicle.findByIdAndUpdate(req.params.id, req.body);
  if (!updateData) {
    return next(new appError("No tour found with that ID", 404));
  }
  res.status(201).json({
    status: "success",
    data: updateData,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  await vehicle.findByIdAndDelete(req.params.id);
  res.status(404).json({
    status: "success",
    data: null,
  });
});
