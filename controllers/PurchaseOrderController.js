const PurchaseOrder = require("../models/PurchaseOrderModel");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.getAllPurchaseOrders = async (req, res) => {
  try {
    const features = new ApiFeatures(PurchaseOrder.find(), req.query)
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
exports.createPurchaseOrder = catchAsync(async (req, res, next) => {
  const data = await PurchaseOrder.create(req.body);
  if (!data) {
    return next(new appError("No tour found with that ID", 404));
  }
  res.status(201).json({
    status: "success",
    data: data,
  });
});
exports.getOne = catchAsync(async (req, res, next) => {
  const data = await PurchaseOrder.findById(req.params.id);
  if (!data) {
    return next(new appError("No tour found with that ID", 404));
  }
  res.status(201).json({
    status: "success",
    data: data,
  });
});
exports.updateOne = catchAsync(async (req, res, next) => {
  const updateData = await PurchaseOrder.findByIdAndUpdate(
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
  await PurchaseOrder.findByIdAndDelete(req.params.id);
  res.status(404).json({
    status: "success",
    data: null,
  });
});
