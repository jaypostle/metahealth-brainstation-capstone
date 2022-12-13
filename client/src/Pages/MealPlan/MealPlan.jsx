import React, { useEffect, useState } from "react";
import { useMealPlan, useMealPlanClear } from "../../Context/MealPlanContext";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import RecipeWall from "../../Components/RecipeWall/RecipeWall";
import axios from "axios";

function MealPlan() {
  const mealPlan = useMealPlan();
  const mealPlanClear = useMealPlanClear();
  const [confirmSuccess, setConfirmSuccess] = useState("");
  const [mealPlanRecipes, setMealPlanRecipes] = useState();

  const fetchRecipesSearchData = async (queryString) => {
    try {
      const queryObj = {
        query: queryString,
      };
      const response = await axios.post(
        `http://localhost:8080/api/recipes/bulk`,
        queryObj
      );
      setMealPlanRecipes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const getMealPlanInfo = async () => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "eeef1d4a6cmsh6a9981b462c7423p125e89jsn3f5550386605",
  //       "X-RapidAPI-Host":
  //         "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  //     },
  //   };

  //   fetch(
  //     "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=987%2C715538%2C716429&includeNutrition=true",
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) => console.log(response))
  //     .catch((err) => console.error(err));
  // };

  useEffect(() => {
    console.log(mealPlan);
    const query = mealPlan.join("%2C");
    fetchRecipesSearchData(query);
  }, [mealPlan]);

  const postMealPlan = async (mealPlanString) => {
    try {
      const mealPlanObj = {
        meal_plan: mealPlanString,
        users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      };
      const response = await axios.post(
        `http://localhost:8080/api/mealplans`,
        mealPlanObj
      );
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const postNutritionDataPoint = async (
    mealPlanId,
    nutritionType,
    nutritionVolume
  ) => {
    try {
      const nutritionDataPointObj = {
        users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
        mealplan_id: mealPlanId,
        nutrition_type: nutritionType,
        nutrition_volume: nutritionVolume,
      };
      const response = await axios.post(
        `http://localhost:8080/api/nutritiondata`,
        nutritionDataPointObj
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmMealPlan = (e) => {
    // grab nutrition data from each recipe
    const totalNutritionType = (ntype) => {
      let totalByNutrition = 0;
      mealPlanRecipes.map((recipe) => {
        totalByNutrition += recipe.nutrition.nutrients.find(
          (obj) => obj.name === ntype
        ).amount;
      });
      return totalByNutrition;
    };

    // make one object with the sum of all iron (volume and type)
    const nutritionDataPostObj = {
      nutrition_type: "Iron",
      nutrition_volume: totalNutritionType("Iron"),
    };
    console.log(nutritionDataPostObj);

    // Post a meal plan, return the mealplan Id
    postMealPlan(mealPlan.join(",")).then((res) => {
      // post a nutritionData point with this mealPlanId newly created
      // console.log(res);
      postNutritionDataPoint(res.id, "Iron", totalNutritionType("Iron"));
    });

    // sets Mealplan to null
    // sets mealplan recipes to null (this will happen automatically when you set mealplan to null)
    mealPlanClear();
    setConfirmSuccess("Meal Plan Confirmed and Nutrition Data Point created.");
  };

  return (
    <section>
      <h1>Meal Plan</h1>
      <button
        onClick={(e) => {
          handleConfirmMealPlan(e);
        }}
      >
        Confirm Meal Plan
      </button>
      {confirmSuccess && <h4>{confirmSuccess}</h4>}
      {mealPlanRecipes && <RecipeWall recipes={mealPlanRecipes} />}
    </section>
  );
}

export default MealPlan;
