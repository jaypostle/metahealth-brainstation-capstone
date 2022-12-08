import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import RecipeWall from "../../Components/RecipeWall/RecipeWall";
import data from "../../data/data.json";

function Discover() {
  const [recipeId, setRecipeId] = useState("716429");
  const [searchString, setSearchString] = useState("");
  const [discoverRecipes, setDiscoverRecipes] = useState([]);
  const [failureMessage, setFailureMessage] = useState("");

  useEffect(() => {
    console.log("search String after submit", searchString);
    console.log("discover params after submit", discoverParams);
    fetchRecipesSearchData(searchString);
  }, [searchString]);

  const fetchRecipesSearchData = async (queryString) => {
    try {
      const queryObj = {
        query: queryString,
      };
      const response = await axios.post(
        `http://localhost:8080/api/recipes/discover`,
        queryObj
      );
      console.log(response.data);
      if (response.data.results.length > 0) {
        setDiscoverRecipes(response.data.results);
      } else {
        setDiscoverRecipes([]);
        setFailureMessage(
          "Query contained no results. Please try another set of parameters."
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  //**
  // Form State
  // */

  const [discoverParams, setDiscoverParams] = useState({
    mealType: "main course",
    search: null,
    fridgeSearch: null,
    discoverFridge: [],
    dietaryPreferences: [],
    allergens: [],
  });

  //**
  // Form References
  /**/
  // useRef to get values of the form
  const formRef = useRef();

  const handleChange = (e) => {
    setDiscoverParams({ ...discoverParams, [e.target.name]: e.target.value });
    console.log(e.target.type, e.target.name, ":", e.target.value);
  };

  const handleCheckBoxChange = (e) => {
    // console.log(e.target.name, ":", e.target.value);

    // find that key
    // console.log(e.target.checked);
    // if (discoverParams[e.target.name].length === 0) {
    if (e.target.checked) {
      // this will add the checkbox target value into the array of that name
      const newArray = [...discoverParams[e.target.name], e.target.value];
      setDiscoverParams({
        ...discoverParams,
        [e.target.name]: newArray,
      });
    } else {
      // find that item and take it out
      const filteredArray = discoverParams[e.target.name].filter(
        (item) => item !== e.target.value
      );
      setDiscoverParams({
        ...discoverParams,
        [e.target.name]: filteredArray,
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const searchParamsArray = [];
    // take the discoverParams object

    // mealType = type
    let type;
    if (discoverParams.mealType) {
      type = `type=${discoverParams.mealType}`;
      searchParamsArray.push(type);
    }
    // search = query
    let query;
    if (discoverParams.search) {
      query = `query=${discoverParams.search}`;
      searchParamsArray.push(query);
    }

    const arrayBuilder = (queryTypeInput, objKey) => {
      let queryType = queryTypeInput;
      if (discoverParams[objKey].length === 1) {
        queryType = `${queryType}=${discoverParams[objKey][0]}`;
      } else {
        // Changing the join value to a | will make them OR statements , is AND
        queryType = `${queryType}=${discoverParams[objKey].join(",")}`;
      }
      return queryType;
    };

    // allergens = intolerances

    if (discoverParams.allergens.length > 0) {
      const newQuery = arrayBuilder("intolerances", "allergens");
      searchParamsArray.push(newQuery);
    }

    // dietaryPreferences = diet
    if (discoverParams.dietaryPreferences.length > 0) {
      searchParamsArray.push(arrayBuilder("diet", "dietaryPreferences"));
    }

    // discoverFridge = includeIngredients
    let discoverFridgeQuery = "";
    if (discoverParams.discoverFridge.length > 0) {
      if (discoverParams.fridgeSearch !== null) {
        discoverFridgeQuery = `${arrayBuilder(
          "includeIngredients",
          "discoverFridge"
        )}|${discoverParams.fridgeSearch}`;
      } else {
        discoverFridgeQuery = arrayBuilder(
          "includeIngredients",
          "discoverFridge"
        );
      }
      searchParamsArray.push(discoverFridgeQuery);
    } else {
      if (discoverParams.fridgeSearch !== null) {
        discoverFridgeQuery = `includeIngredients=${discoverParams.fridgeSearch}`;
      }
      searchParamsArray.push(discoverFridgeQuery);
    }

    const newSearchString = searchParamsArray
      .map((param) => {
        return `&${param}`;
      })
      .join("");

    console.log(newSearchString);

    setSearchString(newSearchString);
  };

  return (
    <div>
      <h1>Discover Recipes</h1>

      <form
        className="discover-recipes-form"
        ref={formRef}
        onSubmit={handleFormSubmit}
      >
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
            <option
              type="text"
              className="discover__meal-type"
              value="appetizer"
            >
              Appetizer
            </option>
            <option
              type="text"
              className="discover__meal-type"
              value="main course"
            >
              Main Course
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
            type="search"
            className="discover__search"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </label>
        <div className="discover-fridge-wrapper">
          What's in your fridge
          <div className="discover-fridge-wrapper--checkboxes">
            <label className="discover__label--checkbox">
              Chicken
              <input
                name="discoverFridge"
                type="checkbox"
                className="discover-fridge"
                value="chicken"
                onClick={handleCheckBoxChange}
              />
            </label>
            <label className="discover__label--checkbox">
              Beef
              <input
                name="discoverFridge"
                type="checkbox"
                className="discover-fridge"
                value="beef"
                onClick={handleCheckBoxChange}
              />
            </label>
            <label className="discover__label--checkbox">
              Onions
              <input
                name="discoverFridge"
                type="checkbox"
                className="discover-fridge"
                value="onion"
                onClick={handleCheckBoxChange}
              />
            </label>
          </div>
          <label className="discover__label">
            Search
            <input
              name="fridgeSearch"
              type="search"
              className="allergens"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>
        </div>
        <label className="discover__label">
          Dietary Preferences
          <div className="discover__dietary-preferences-wrapper--checkboxes">
            <label className="discover__label--checkbox">
              Ketogenic
              <input
                name="dietaryPreferences"
                type="checkbox"
                className="dietary-preferences"
                value="ketogenic"
                onClick={handleCheckBoxChange}
              />
            </label>
            <label className="discover__label--checkbox">
              Vegetarian
              <input
                name="dietaryPreferences"
                type="checkbox"
                className="dietary-preferences"
                value="vegetarian"
                onClick={handleCheckBoxChange}
              />
            </label>
            <label className="discover__label--checkbox">
              Gluten-Free
              <input
                name="dietaryPreferences"
                type="checkbox"
                className="allergens"
                value="gluten-free"
                onClick={handleCheckBoxChange}
              />
            </label>
          </div>
        </label>
        <label className="discover__label">
          Allergens
          <div className="discover__allergens-wrapper--checkboxes">
            <label className="discover__label--checkbox">
              Tree Nuts
              <input
                name="allergens"
                type="checkbox"
                className="allergens"
                value="tree nut"
                onClick={handleCheckBoxChange}
              />
            </label>
            <label className="discover__label--checkbox">
              Shellfish
              <input
                name="allergens"
                type="checkbox"
                className="allergens"
                value="shellfish"
                onClick={handleCheckBoxChange}
              />
            </label>
            <label className="discover__label--checkbox">
              Dairy
              <input
                name="allergens"
                type="checkbox"
                className="allergens"
                value="dairy"
                onClick={handleCheckBoxChange}
              />
            </label>
          </div>
        </label>
        {/* Place Sorts here */}
        {/* Sort by Iron, Salt, Sugar etc */}
        <button type="submit">Discover Recipes</button>
      </form>

      {failureMessage && <h2>{failureMessage}</h2>}

      {discoverRecipes && (
        <RecipeWall
          // recipes={recipesSearchResults}
          recipes={discoverRecipes}
        />
      )}
    </div>
  );
}

export default Discover;
