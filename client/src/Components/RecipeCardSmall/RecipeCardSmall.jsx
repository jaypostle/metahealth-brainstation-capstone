import React from "react";

function RecipeCardSmall({ recipe }) {
  return (
    <article key={recipe.id}>
      {recipe.title}
      {/* time, photo */}
      <img src={recipe.image} alt={recipe.title + "image"} />
    </article>
  );
}

export default RecipeCardSmall;
