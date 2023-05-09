const express = require("express");
const controllers = require("../controllers/vehicleControllor");
const router = express.Router();

router
  .route("/")
  .get(controllers.getAllVehicles)
  .post(controllers.createVehicle);
router
  .route("/:id")
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.delete);

module.exports = router;
