const express = require("express");
const router = express.Router();

const path = require("node:path");

router.post("/discover", async (req, res) => {
  const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?addRecipeInformation=true&${req.body.query}`;

  // query=pasta&cuisine=italian&excludeIngredients=eggs&type=main%20course

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const jsonRes = await response.json();
    res.json(jsonRes);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// Multiple Recipes
router.post("/bulk", async (req, res) => {
  const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=${req.body.query}&includeNutrition=true`;

  // const url =
  //   "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=987%2C715538%2C716429&includeNutrition=true";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    // console.log(response);
    const jsonRes = await response.json();
    res.json(jsonRes);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${req.params.id}/information?includeNutrition=true`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const jsonRes = await response.json();
    res.json(jsonRes);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
