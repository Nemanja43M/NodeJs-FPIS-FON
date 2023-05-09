const express = require("express");
const controllers = require("../controllers/productController");
const router = express.Router();

router
  .route("/")
  .get(controllers.getAllproduct)
  .post(controllers.createproduct);
router
  .route("/:id")
  .get(controllers.getOne)
  .patch(controllers.updateOne)
  .delete(controllers.delete);

module.exports = router;
