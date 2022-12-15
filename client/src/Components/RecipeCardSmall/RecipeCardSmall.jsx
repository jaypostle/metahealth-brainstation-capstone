import React from "react";
import "./RecipeCardSmall.scss";

function RecipeCardSmall({ recipe }) {
  return (
    <article className="recipe-card--small" key={recipe.id}>
      {/* time, photo */}
      <img src={recipe.image} alt={recipe.title + "image"} />
      <h4> {recipe.title}</h4>
    </article>
  );
}

export default RecipeCardSmall;
