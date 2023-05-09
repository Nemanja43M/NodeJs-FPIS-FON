const ItemDelivery = require("../models/itemsDeliveryModel");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.getAllproduct = async (req, res) => {
  try {
    const features = new ApiFeatures(ItemDelivery.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();
    const allData = await features.query;

    res.status(200).json({
      status: "success",
      results: allData.length,
      data: {
        allData,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      messagge: "Err",
    });
  }
};
exports.createItemDelivery = catchAsync(async (req, res, next) => {
  const data = await ItemDelivery.create(req.body);
  if (!data) {
    return next(new appError("No tour found with that ID", 404));
  }
  res.status(201).json({
    status: "success",
    data: data,
  });
});
exports.getOne = catchAsync(async (req, res, next) => {
  const data = await ItemDelivery.findById(req.params.id);
  if (!data) {
    return next(new appError("No tour found with that ID", 404));
  }
  res.status(201).json({
    status: "success",
    data: data,
  });
});
exports.updateOne = catchAsync(async (req, res, next) => {
  const updateData = await ItemDelivery.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  if (!updateData) {
    return next(new appError("No tour found with that ID", 404));
  }
  res.status(201).json({
    status: "success",
    data: updateData,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  await ItemDelivery.findByIdAndDelete(req.params.id);
  res.status(404).json({
    status: "success",
    data: null,
  });
});
