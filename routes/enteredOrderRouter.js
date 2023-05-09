const express = require("express");
const controllers = require("../controllers/enteredOrderController");
const router = express.Router();

router.route("/").get(controllers.getAll).post(controllers.create);
router.route("/:id").put(controllers.update);

module.exports = router;
