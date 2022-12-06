import Charts from "./Pages/Charts/Examples/Charts";
import DiscoverRecipes from "./Pages/DiscoverRecipes/DiscoverRecipes";
import MealPlan from "./Pages/MealPlan/MealPlan";
import NutritionChart from "./Pages/Charts/NutritionChart/NutritionChart";
import Header from "./Components/Header/Header";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/discover" />} />
          <Route path="/discover" element={<DiscoverRecipes />} />
          <Route path="/mealplan" element={<MealPlan />} />
          <Route path="/nutritiondata" element={<NutritionChart />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
