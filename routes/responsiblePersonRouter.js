const express = require("express");
const controllers = require("../controllers/personResponsibleController");
const router = express.Router();

router
  .route("/")
  .get(controllers.getAllresponsiblePerson)
  .post(controllers.createresponsiblePerson);
router
  .route("/:id")
  .get(controllers.getOne)
  .patch(controllers.updateOne)
  .delete(controllers.delete);

module.exports = router;
