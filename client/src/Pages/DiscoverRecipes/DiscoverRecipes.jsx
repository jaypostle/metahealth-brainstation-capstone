import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

function Discover() {
  const [recipeId, setRecipeId] = useState("716429");
  const [searchString, setSearchString] = useState(
    "&includeIngredients=shrimp"
  );
  const [singleRecipeData, setSingleRecipeData] = useState();
  const [recipesSearchResults, setRecipesSearchResults] = useState([]);

  useEffect(() => {
    // fetchSingleRecipeData(recipeId);
    // fetchRecipesSearchData(searchString);
  }, []);

  const apiKey = "92319c9df23f46b19c428982982f8055";
  const baseURL = "https://api.spoonacular.com/recipes";

  const fetchSingleRecipeData = async (recipeId) => {
    try {
      const { data: recipe } = await axios.get(
        `${baseURL}/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`
      );
      console.log(recipe);
      setSingleRecipeData(recipe);
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
      setRecipesSearchResults(searchResults);
    } catch (err) {
      console.log(err);
    }
  };

  //**
  // Form State
  // */

  const [discoverParams, setDiscoverParams] = useState({
    mealType: "dinner",
    search: null,
    discoverFridge: [],
    dietaryPreferences: [],
    allergens: [],
  });

  useEffect(() => {
    console.log(discoverParams);
  }, [discoverParams]);

  //**
  // Form References
  /**/
  // useRef to get values of the form
  const formRef = useRef();

  const handleChange = (e) => {
    setDiscoverParams({ ...discoverParams, [e.target.name]: e.target.value });
    console.log(e.target.name, ":", e.target.value);
  };

  const handleCheckBoxChange = (e) => {
    console.log(e.target.name, ":", e.target.value);

    // find that key
    console.log(e.target.checked);
    // if (discoverParams[e.target.name].length === 0) {
    if (e.target.checked) {
      // this will add the checkbox target value into the array of that name
      setDiscoverParams({
        ...discoverParams,
        ...[e.target.name],
        [e.target.name]: e.target.value,
      });
    }

    // push that value into the array (slice)
    // or find it and slice it out
  };

  //  how to design custom checkboxes https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_custom_checkbox

  return (
    <div>
      <h1>Discover Recipes</h1>

      {/* {recipe && recipe.aggregateLikes} */}
      <form className="discover-recipes-form" ref={formRef}>
        {/*  Select Field */}
        <label htmlFor="meal-type" className="discover__label">
          Meal Type
          <select
            defaultValue={discoverParams.mealType || "Select"}
            placeholder={discoverParams.mealType || "Select"}
            name="mealType"
            id="meal-type"
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <option
              type="text"
              className="discover__meal-type"
              value="breakfast"
            >
              Breakfast
            </option>
            <option type="text" className="discover__meal-type" value="lunch">
              Lunch
            </option>
            <option type="text" className="discover__meal-type" value="dinner">
              Dinner
            </option>
            <option type="text" className="discover__meal-type" value="dessert">
              Dessert
            </option>
          </select>
        </label>
        <label className="discover__label">
          Search
          <input
            name="search"
            type="text"
            className="discover__search"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </label>
        <div className="discover__fridge-wrapper">
          What's in your fridge
          <div className="discover__fridge-wrapper--checkboxes">
            <label className="discover__label--checkbox">
              Chicken
              <input
                name="discoverFridge"
                type="checkbox"
                className="discover__fridge"
                value="chicken"
                onClick={handleCheckBoxChange}
              />
            </label>
            <label className="discover__label--checkbox">
              Beef
              <input
                name="discoverFridge"
                type="checkbox"
                className="discover__fridge"
                value="beef"
                onClick={handleCheckBoxChange}
              />
            </label>
            <label className="discover__label--checkbox">
              Onions
              <input
                name="discoverFridge"
                type="checkbox"
                className="discover__fridge"
                value="onions"
                onClick={handleCheckBoxChange}
              />
            </label>
          </div>
          <label className="discover__label">
            What's in your fridge - Search
            <input
              name="fridgeSearch"
              type="search"
              className="discover__fridge"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>
        </div>
        <label className="discover__label">
          Dietary Preferences
          <input type="text" className="discover__dietary-preferences" />
        </label>
        <label className="discover__label">
          Allergens
          <input type="text" className="discover__allergens" />
        </label>
        {/* Place Sorts here */}
        {/* Sort by Iron, Salt, Sugar etc */}
      </form>
    </div>
  );
}

export default Discover;
