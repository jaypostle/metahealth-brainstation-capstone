import Charts from "./Pages/Charts/Examples/Charts";
import DiscoverRecipes from "./Pages/DiscoverRecipes/DiscoverRecipes";
import MealPlan from "./Pages/MealPlan/MealPlan";
import NutritionChart from "./Pages/Charts/NutritionChart/NutritionChart";
import Header from "./Components/Header/Header";
import Recipe from "./Pages/Recipe/Recipe";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { MealPlanProvider } from "./Context/MealPlanContext";

function App() {
  return (
    <MealPlanProvider>
      <BrowserRouter>
        <div className="App">
          <Header />

          <Routes>
            <Route path="/" element={<Navigate to="/discover" />} />
            <Route path="/discover" element={<DiscoverRecipes />} />
            <Route path="/recipe/:recipeId" element={<Recipe />} />
            <Route path="/mealplan" element={<MealPlan />} />
            <Route path="/nutritiondata" element={<NutritionChart />} />
          </Routes>
        </div>
      </BrowserRouter>
    </MealPlanProvider>
  );
}

export default App;
