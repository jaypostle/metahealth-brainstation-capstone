const express = require("express");
const router = express.Router();

const path = require("node:path");

const mealplansController = require("../controllers/mealplansController");

router.route("/").get(mealplansController.index);

router.route("/:userId").get(mealplansController.allMealplansByUser);

// post a meal plan
router.route("/").post(mealplansController.addMealPlan);

module.exports = router;
