import React from "react";



function RecipeWall({ recipes }) {

  console.log(recipes)
  return (
    <section className="recipe-wall">
      RecipeWall
      {recipes &&
        recipes.map((recipe) => {
          return (
            <article key={recipe.id}>
              {recipe.title}
              {/* time, photo */}
              {recipe.time}

              {/* labels */}
              <div>
                Diets
                {recipe.diets.map((diet) => {
                  <span>{diet}</span>;
                })}
              </div>

              {/* show allergens */}
              <div>
                Allergens
                {recipe.vegetarian && "vegetarian"}
                {recipe.vegan && "vegan"}
                {recipe.glutenFree && "gluten free"}
                {recipe.dariyFree && "dairy free"}
              </div>

              <img src={recipe.image} alt={recipe.title + "image"} />
            </article>
          );
        })}
    </section>
  );
}

export default RecipeWall;
