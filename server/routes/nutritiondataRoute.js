const express = require("express");
const router = express.Router();

const path = require("node:path");

const nutritiondataController = require("../controllers/nutritiondataController");

router
  .route("/")
  .get(nutritiondataController.index)
  .post(nutritiondataController.addNutritionData);

// all nutrition data by user and nutrition type
router
  .route("/:userId/:nutritionType")
  .get(nutritiondataController.allNutritionByUserByType);

router.route("/:userId").get(nutritiondataController.allNutritionByUser);

module.exports = router;
