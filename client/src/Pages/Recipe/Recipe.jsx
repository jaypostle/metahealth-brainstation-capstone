import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import singleRecipeData from "../../data/singleRecipeData.json";
import { useMealPlan, useMealPlanUpdate } from "../../Context/MealPlanContext";
import { useState } from "react";
import axios from "axios";
import "./Recipe.scss";

function Recipe({ updateMealPlan }) {
  const { recipeId } = useParams();

  const mealPlan = useMealPlan();
  const mealPlanUpdate = useMealPlanUpdate();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipesSearchData(recipeId);
  }, [recipeId]);

  const fetchRecipesSearchData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/recipes/${id}`
      );
      // console.log(response.data);
      setRecipe(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const recipe = singleRecipeData;

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

  const renderRecipeSummary = function () {
    return { __html: recipe.summary };
  };

  return (
    <>
      {recipe && (
        <section className="recipe">
          <img
            className="recipe__image"
            src={recipe.image}
            alt={(recipe.title, " image")}
          />
          <div className="recipe__info-wrapper">
            <div className="recipe__meta-info">
              <h1>{recipe.title}</h1>
              <span>Ready in: {recipe.readyInMinutes} minutes</span>
              <div className="recipe__buttons">
                <button
                  className="primary-btn"
                  onClick={() => {
                    mealPlanUpdate(recipe.id);
                  }}
                >
                  {mealPlan.includes(recipe.id) ? "Remove" : "Add to Plan"}
                </button>
              </div>

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
              <div dangerouslySetInnerHTML={renderRecipeSummary()}></div>
            </div>

            {/* ingredients with amounts and photos */}
            <div className="recipe__ingredients">
              <h3>Ingredients</h3>
              <ul>
                {recipe.extendedIngredients.map((ingredient, i) => {
                  return (
                    <li key={i}>
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
                  {findNutrient(
                    recipe.nutrition.nutrients,
                    "name",
                    "Saturated Fat"
                  )}
                  {findNutrient(recipe.nutrition.nutrients, "name", "Protein")}
                  {findNutrient(
                    recipe.nutrition.nutrients,
                    "name",
                    "Carbohydrates"
                  )}
                </div>
              )}

              {/* filter nutrients minus marcos */}
              <div className="recipe__rda">
                <h4>Top 10 Nutrients by RDA</h4>
                <ul>
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
                        <>
                          <li key={i}>
                            <div className="recipe__nutrient-type">
                              <span>{nutrient.name} </span>
                              <span>
                                <strong>
                                  {nutrient.amount}
                                  {nutrient.unit}
                                </strong>
                              </span>
                            </div>
                          </li>
                          <li>
                            <div
                              className="recipe__rda-percent"
                              style={{
                                display: "inline-block",
                                backgroundColor: "lightgrey",
                                width: `${nutrient.percentOfDailyNeeds}%`,
                              }}
                            >
                              {nutrient.percentOfDailyNeeds}%
                            </div>
                          </li>
                        </>
                      );
                    })}
                </ul>
              </div>
            </div>

            {/* OPTIONAL */}
            {/* price breakdown? */}
            {/* instructions? */}
          </div>
        </section>
      )}
    </>
  );
}

export default Recipe;
