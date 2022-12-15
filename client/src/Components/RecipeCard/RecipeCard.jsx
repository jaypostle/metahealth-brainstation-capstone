import React from "react";
import { Link } from "react-router-dom";
import { useMealPlan, useMealPlanUpdate } from "../../Context/MealPlanContext";
import "./RecipeCard.scss";

function RecipeCard({ recipe }) {
  const mealPlan = useMealPlan();
  const mealPlanUpdate = useMealPlanUpdate();

  return (
    <article className="recipe-card" key={recipe.id}>
      <img
        className="recipe-card__image"
        src={recipe.image}
        alt={recipe.title + "image"}
      />
      <div className="recipe-card__all-text">
        <div className="recipe-card__meta-data">
          <h3 className="recipe-card__title">{recipe.title}</h3>
          {/* time, photo */}
          <span className="recipe-card__time">{recipe.time}</span>
        </div>
        {/* labels */}
        <div className="recipe-card__diets">
          <h4>Diets</h4>
          {recipe.diets.map((diet, i) => (
            <span key={i}>{diet} | </span>
          ))}
        </div>

        {/* show allergens */}
        <div className="recipe-card__allergens">
          <h4>Allergens</h4>
          <span>{recipe.vegetarian && " vegetarian |"}</span>
          <span>{recipe.vegan && " vegan |"} </span>
          <span>{recipe.glutenFree && " gluten free |"} </span>
          <span>{recipe.dariyFree && " dairy free"}</span>
        </div>
      </div>

      <div className="recipe-card__button-wrapper">
        <button
          className={`${
            mealPlan.includes(recipe.id)
              ? "recipe-card__button primary-btn primary-btn--remove"
              : "recipe-card__button primary-btn"
          }`}
          onClick={function () {
            mealPlanUpdate(recipe.id);
          }}
        >
          {mealPlan.includes(recipe.id) ? "Remove" : "Add to Meal Plan"}
        </button>
        <Link
          to={`/recipe/${recipe.id}`}
          className="recipe-card__view-recipe secondary-btn"
        >
          View Recipe
        </Link>
      </div>
    </article>
  );
}

export default RecipeCard;
