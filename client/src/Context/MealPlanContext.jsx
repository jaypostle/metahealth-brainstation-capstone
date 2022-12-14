import React, { useState, useContext, useEffect } from "react";

const MealPlanContext = React.createContext();
const MealPlanUpdateContext = React.createContext();
const MealPlanClearContext = React.createContext();

export function useMealPlan() {
  return useContext(MealPlanContext);
}

export function useMealPlanUpdate() {
  return useContext(MealPlanUpdateContext);
}

export function useMealPlanClear() {
  return useContext(MealPlanClearContext);
}

export function MealPlanProvider({ children }) {
  const [mealPlan, setMealPlan] = useState([]);

  useEffect(() => {
    const meals = JSON.parse(localStorage.getItem("mealPlan"));
    if (meals) {
      setMealPlan(meals);
    }
  }, []);

  useEffect(() => {
    // this will update local storage whenever mealPlan state is updated
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
  }, [mealPlan]);

  function toggleMealPlan(id) {
    // console.log("toggle meal plan ran");
    // find that id in the meal plan
    if (mealPlan.includes(id)) {
      const newMealPlan = mealPlan.filter((recipe) => recipe !== id);
      setMealPlan(newMealPlan);
    } else {
      // takes an id and adds it to the meal plan
      setMealPlan([...mealPlan, id]);
    }
  }

  function clearMealPlan() {
    // console.log("clear meal plan ran");
    localStorage.clear();
    setMealPlan([]);
  }

  useEffect(() => {
    // console.log(mealPlan);
  }, [mealPlan]);

  return (
    <MealPlanContext.Provider value={mealPlan}>
      <MealPlanUpdateContext.Provider value={toggleMealPlan}>
        <MealPlanClearContext.Provider value={clearMealPlan}>
          {children}
        </MealPlanClearContext.Provider>
      </MealPlanUpdateContext.Provider>
    </MealPlanContext.Provider>
  );
}
