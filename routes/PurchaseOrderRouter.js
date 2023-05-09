const express = require("express");
const controllers = require("../controllers/PurchaseOrderController");
const router = express.Router();

router
  .route("/")
  .get(controllers.getAllPurchaseOrders)
  .post(controllers.createPurchaseOrder);
router
  .route("/:id")
  .get(controllers.getOne)
  .patch(controllers.updateOne)
  .delete(controllers.delete);

module.exports = router;
