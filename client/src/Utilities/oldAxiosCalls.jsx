// import { useState, useEffect, useRef } from "react";

// const [singleRecipeData, setSingleRecipeData] = useState();
// const [recipesSearchResults, setRecipesSearchResults] = useState([]);

// // const apiKey = "92319c9df23f46b19c428982982f8055";

// const apiKey = "2befc7f07a8544daa65331b2147b8673";

// const baseURL = "https://api.spoonacular.com/recipes";

// const fetchSingleRecipeData = async (recipeId) => {
//   try {
//     const { data: recipe } = await axios.get(
//       `${baseURL}/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`
//     );
//     console.log(recipe);
//     setSingleRecipeData(recipe);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const fetchRecipesSearchData = async (searchString) => {
//   // searchString looks like &includeIngredients=shrimp&diet=paleo|gluten free
//   try {
//     const { data: searchResults } = await axios.get(
//       `${baseURL}/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true&addRecipeInformation=true${searchString}`
//     );
//     console.log(searchResults);
//     setRecipesSearchResults(searchResults);
//   } catch (err) {
//     console.log(err);
//   }
// };
