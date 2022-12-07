import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import singleRecipeData from "../../data/singleRecipeData.json";
import { useMealPlan, useMealPlanUpdate } from "../../Context/MealPlanContext";
import { useState } from "react";

function Recipe({ updateMealPlan }) {
  const { recipeId } = useParams();

  const mealPlan = useMealPlan();
  const mealPlanUpdate = useMealPlanUpdate();

  useEffect(() => {
    // getIndividualItemAxios(itemId);
    // console.log(recipeId);
  }, [recipeId]);

  const recipe = singleRecipeData;

  const findNutrient = (array, name, nutrient) => {
    let item = array.find(({ name }) => name === nutrient);
    return (
      <p>
        {item.amount}
        {item.unit} {item.name} ({item.percentOfDailyNeeds}% of daily
        requirements)
      </p>
    );
  };

  // const renderRecipeSummary = function () {
  //   return { __html: recipe.summary };
  // };

  const [summary, setSummary] = useState(recipe.summary);

  return (
    <div>
      <div className="recipe__meta-info">
        <img src={recipe.image} alt={(recipe.title, " image")} />
        <h1>{recipe.title}</h1>
        <span>Ready in: {recipe.readyInMinutes} minutes</span>
        <a href={recipe.sourceUrl} target="_blank" rel="noreferrer">
          View Recipe Online
        </a>

        <button
          onClick={() => {
            mealPlanUpdate(recipe.id);
          }}
        >
          {mealPlan.includes(recipe.id)
            ? "Remove from Meal Plan"
            : "Add to Meal Plan"}
        </button>

        {/* show allergens */}
        <div>
          {recipe.vegetarian ||
          recipe.vegan ||
          recipe.glutenFree ||
          recipe.dariyFree ? (
            <h4>Allergens</h4>
          ) : (
            "No Listed Allergens"
          )}

          {recipe.vegetarian && "vegetarian"}
          {recipe.vegan && "vegan"}
          {recipe.glutenFree && "gluten free"}
          {recipe.dariyFree && "dairy free"}
        </div>
      </div>
      {/* description */}
      <div className="recipe__summary">
        {/* <div dangerouslySetInnerHTML={renderRecipeSummary()}></div> */}
        {summary}
      </div>

      {/* ingredients with amounts and photos */}
      <div className="recipe__ingredients">
        <h3>Ingredients</h3>
        <ul>
          {recipe.extendedIngredients.map((ingredient) => {
            return (
              <li key={ingredient.id}>
                <strong>
                  {ingredient.amount} {ingredient.unit}
                </strong>{" "}
                of {ingredient.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="recipe__nutrition">
        <h3>Nutrition</h3>
        {recipe.nutrition?.nutrients && (
          <div className="recipe__macros">
            <h4>Macros</h4>
            {findNutrient(recipe.nutrition.nutrients, "name", "Calories")}
            {findNutrient(recipe.nutrition.nutrients, "name", "Fat")}
            {findNutrient(recipe.nutrition.nutrients, "name", "Saturated Fat")}
            {findNutrient(recipe.nutrition.nutrients, "name", "Protein")}
            {findNutrient(recipe.nutrition.nutrients, "name", "Carbohydrates")}
          </div>
        )}

        {/* filter nutrients minus marcos */}
        <h4>Top 10 Nutrients by RDA</h4>
        {recipe.nutrition.nutrients
          .filter(
            (nutrient) =>
              nutrient.name !== "Calories" &&
              nutrient.name !== "Fat" &&
              nutrient.name !== "Saturated Fat" &&
              nutrient.name !== "Protein" &&
              nutrient.name !== "Carbohydrates"
          )
          // {/* minerals / sort by top ten highest by rda */}
          .sort(function (a, b) {
            let keyA = a.percentOfDailyNeeds;
            let keyB = b.percentOfDailyNeeds;
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
          })
          .slice(0, 10)
          .map((nutrient, i) => {
            return (
              <li key={i}>
                <span>{nutrient.name}</span>
                <span>
                  {nutrient.amount}
                  {nutrient.unit}
                </span>
                <div
                  style={{
                    display: "inline-block",
                    backgroundColor: "lightgrey",
                    width: `${nutrient.percentOfDailyNeeds}%`,
                  }}
                >
                  {nutrient.percentOfDailyNeeds}%
                </div>
              </li>
            );
          })}
      </div>

      {/* OPTIONAL */}
      {/* price breakdown? */}
      {/* instructions? */}
    </div>
  );
}

export default Recipe;
