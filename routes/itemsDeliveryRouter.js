const express = require("express");
const controllers = require("../controllers/itemsDeliveryController");
const router = express.Router();

router
  .route("/")
  .get(controllers.getAllproduct)
  .post(controllers.createItemDelivery);
router
  .route("/:id")
  .get(controllers.getOne)
  .patch(controllers.updateOne)
  .delete(controllers.delete);

module.exports = router;
