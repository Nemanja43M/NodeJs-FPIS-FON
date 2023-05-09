const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());
///////////////////////////////////////////////
const globalErrorHedler = require("./controllers/errorController");
const AppError = require("./utils/appError");
////////////////////////////////////////////////
const vehicleRouter = require("./routes/vehicleRouter");
const responsiblePersonRouter = require("./routes/responsiblePersonRouter");
const deliveryNoteRouter = require("./routes/deliveryNoteRouter");
const productRouter = require("./routes/productRouter");
const itemsDelivaryRouter = require("./routes/itemsDeliveryRouter");
const PurchaseOrderRouter = require("./routes/PurchaseOrderRouter");
const EnteredOrderRouter = require("./routes/enteredOrderRouter");
app.use("/api/v1/Vehicle", vehicleRouter);
app.use("/api/v1/responsiblePerson", responsiblePersonRouter);
app.use("/api/v1/deliveryNote", deliveryNoteRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/itemsDelivery", itemsDelivaryRouter);
app.use("/api/v1/PurchaseOrder", PurchaseOrderRouter);
app.use("/api/v1/EnteredOrder", EnteredOrderRouter);

///////////////////////////////////////////////////
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHedler);
module.exports = app;
