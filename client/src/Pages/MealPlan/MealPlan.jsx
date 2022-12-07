import React from "react";
import { useMealPlan, useMealPlanUpdate } from "../../Context/MealPlanContext";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";

function MealPlan() {
  const mealPlan = useMealPlan();
  const mealPlanUpdate = useMealPlanUpdate();

  // take mealplan array
  // get meal data from backend or api

  return (
    <section>
      <h1>Meal Plan</h1>
      {mealPlan &&
        mealPlan.map((id) => {
          // PASS IN THE DATA HERE
          return <li key={id}>{id}</li>;
        })}
    </section>
  );
}

export default MealPlan;
