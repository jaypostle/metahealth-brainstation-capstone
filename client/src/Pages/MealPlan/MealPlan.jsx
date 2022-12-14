import React, { useEffect, useState } from "react";
import { useMealPlan, useMealPlanClear } from "../../Context/MealPlanContext";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import RecipeWall from "../../Components/RecipeWall/RecipeWall";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MealPlan() {
  const mealPlan = useMealPlan();
  const mealPlanClear = useMealPlanClear();
  const [mealPlanRecipes, setMealPlanRecipes] = useState();
  const notify = () => toast("Meal Plan Added.");

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

  useEffect(() => {
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

  let navigate = useNavigate();

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

    // Post a meal plan, return the mealplan Id
    postMealPlan(mealPlan.join(",")).then((res) => {
      // post a nutritionData point with this mealPlanId newly created
      // console.log(res);
      postNutritionDataPoint(res.id, "Iron", totalNutritionType("Iron"));
      postNutritionDataPoint(res.id, "Zinc", totalNutritionType("Zinc"));
      postNutritionDataPoint(
        res.id,
        "Magnesium",
        totalNutritionType("Magnesium")
      );
      postNutritionDataPoint(res.id, "Calcium", totalNutritionType("Calcium"));
    });

    // sets Mealplan to null
    // sets mealplan recipes to null (this will happen automatically when you set mealplan to null)
    mealPlanClear();
    notify();

    setTimeout(() => {
      navigate("/journal");
    }, 3000);
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
      {mealPlanRecipes && <RecipeWall recipes={mealPlanRecipes} />}

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
}

export default MealPlan;
