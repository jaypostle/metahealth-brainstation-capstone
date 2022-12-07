import React from "react";
import { Link } from "react-router-dom";
import { useMealPlan, useMealPlanUpdate } from "../../Context/MealPlanContext";

function RecipeCard({ recipe }) {
  const mealPlan = useMealPlan();
  const mealPlanUpdate = useMealPlanUpdate();

  return (
    <article key={recipe.id}>
      {recipe.title}
      {/* time, photo */}
      {recipe.time}

      {/* labels */}
      <div>
        <h4>Diets</h4>
        {recipe.diets.map((diet, i) => (
          <span key={i}>{diet}</span>
        ))}
      </div>

      {/* show allergens */}
      <div>
        <h4>Allergens</h4>
        {recipe.vegetarian && "vegetarian"}
        {recipe.vegan && "vegan"}
        {recipe.glutenFree && "gluten free"}
        {recipe.dariyFree && "dairy free"}
      </div>

      <img src={recipe.image} alt={recipe.title + "image"} />
      <button
        onClick={function () {
          mealPlanUpdate(recipe.id);
        }}
      >
        {mealPlan.includes(recipe.id)
          ? "Remove from Meal Plan"
          : "Add to Meal Plan"}
      </button>
      <Link to={`/recipe/${recipe.id}`}>View Recipe</Link>
    </article>
  );
}

export default RecipeCard;
