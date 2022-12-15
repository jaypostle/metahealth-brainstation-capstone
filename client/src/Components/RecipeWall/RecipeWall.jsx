import React from "react";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import "./RecipeWall.scss";

function RecipeWall({ recipes }) {
  return (
    <section className="recipe-wall">
      {recipes &&
        recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
    </section>
  );
}

export default RecipeWall;
