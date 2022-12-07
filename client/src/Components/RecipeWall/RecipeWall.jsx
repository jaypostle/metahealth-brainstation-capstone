import React from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";

function RecipeWall({ recipes }) {
  return (
    <section className="recipe-wall">
      RecipeWall
      {recipes &&
        recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
    </section>
  );
}

export default RecipeWall;
