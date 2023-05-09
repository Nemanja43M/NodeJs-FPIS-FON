const express = require("express");
const controllers = require("../controllers/deliveryNoteController");
const router = express.Router();

router
  .route("/")
  .get(controllers.getAlldeliveryNote)
  .post(controllers.createdeliveryNote);
router
  .route("/:id")
  .get(controllers.getOne)
  .patch(controllers.updateOne)
  .delete(controllers.delete);

module.exports = router;
