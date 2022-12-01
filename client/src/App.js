import axios from "axios";
import { useState, useEffect } from "react";
import Charts from "./Pages/Charts/Charts";

function App() {
  const [recipeId, setRecipeId] = useState("716429");
  const [searchString, setSearchString] = useState(
    "&includeIngredients=shrimp"
  );
  const [singleRecipeData, setSingleRecipeData] = useState();
  const [recipesSearchResults, setRecipesSearchResults] = useState([]);

  useEffect(() => {
    fetchSingleRecipeData(recipeId);
    fetchRecipesSearchData(searchString);
  }, []);

  const apiKey = "92319c9df23f46b19c428982982f8055";
  const baseURL = "https://api.spoonacular.com/recipes";

  const fetchSingleRecipeData = async (recipeId) => {
    try {
      const { data: recipe } = await axios.get(
        `${baseURL}/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`
      );
      console.log(recipe);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchRecipesSearchData = async (searchString) => {
    // searchString looks like &includeIngredients=shrimp&diet=paleo|gluten free
    try {
      const { data: searchResults } = await axios.get(
        `${baseURL}/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true${searchString}`
      );
      console.log(searchResults);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      {/* <Charts /> */}
    </div>
  );
}

export default App;
