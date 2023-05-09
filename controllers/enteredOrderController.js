const EnteredOrder = require("../models/EnteredOrderModel");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
var mongoose = require("mongoose");
const deliveryNote = require("../models/deliveryNoteModel");
const itemDelivery = require("../models/itemsDeliveryModel");
const purchaseOrder = require("../models/PurchaseOrderModel");

const transactionOptions = {
  readConcern: { level: "snapshot" },
  writeConcern: { w: "majority" },
  readPreference: "primary",
};

exports.update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { employeeId, orderID, items, productID, deliveryNoteId } = req.body;
  console.log(req.body);

  const session = await mongoose.startSession();
  try {
    await session.startTransaction(transactionOptions);

    await deliveryNote.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: { employeeId: mongoose.Types.ObjectId(employeeId) } },
      { session }
    );

    await purchaseOrder.updateOne(
      { deliveryNoteId: mongoose.Types.ObjectId(id) },
      { $set: { PurchaseOrderCode: orderID } },
      { session }
    );

    for (const item of items) {
      await itemDelivery.remove({ deliveryNoteId });
      await itemDelivery.create(
        [
          {
            orderId: item.id,
            Description: item.description,
            deliveryNoteId,
            Quantity: Number.parseInt(item.amount),
            ProductId: productID,
          },
        ],
        { session }
      );
    }

    // for (const item of items) {
    //   await itemDelivery.updateOne(
    //     { _id: mongoose.Types.ObjectId(item._id) },
    //     {
    //       $set: {
    //         orderId: item.id,
    //         Description: item.description,
    //         Quantity: Number.parseInt(item.amount),
    //         ProductId: productID,
    //       }
    //     },
    //     { session }
    //   )
    // }

    await session.commitTransaction();
  } catch (e) {
    console.log(e);
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
  res.send();
});

exports.create = catchAsync(async (req, res, next) => {
  const { employeeId, items, productID, orderID } = req.body;
  // start transaction
  const session = await mongoose.startSession();
  try {
    await session.startTransaction(transactionOptions);

    // add OTPREMNICA
    const deliveryNoteObj = await deliveryNote.create(
      [
        {
          deliveryNoteId: Math.floor(
            100000 + Math.random() * 900000
          ).toString(),
          date: new Date(),
          employeeId,
        },
      ],
      { session }
    );

    // add PORUDZBENICA
    await purchaseOrder.create(
      [
        {
          deliveryNoteId: deliveryNoteObj[0]._id,
          PurchaseOrderCode: orderID,
          employeeId,
        },
      ],
      { session }
    );

    // add stavka porudzebnice
    for (const item of items) {
      await itemDelivery.create(
        [
          {
            orderId: item.id,
            Description: item.description,
            deliveryNoteId: deliveryNoteObj[0]._id,
            Quantity: Number.parseInt(item.amount),
            ProductId: productID,
          },
        ],
        { session }
      );
    }
    await session.commitTransaction();
    console.log("Transaction successfully committed.");
  } catch (e) {
    // if (error instanceof MongoError && error.hasErrorLabel('UnknownTransactionCommitResult')) {
    //   // add your logic to handle the error
    // }
    // else if (error instanceof MongoError && error.hasErrorLabel('TransientTransactionError')) {
    //   // add your logic to  handle the error
    // } else {
    //   console.log('An error occured in the transaction, performing a data rollback:' + error);
    // }
    console.log(e);
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
  res.send();
});

exports.getAll = async (req, res) => {
  try {
    const features = new ApiFeatures(EnteredOrder.find(), req.query)
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
