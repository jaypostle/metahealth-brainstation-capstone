import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import RecipeWall from "../../Components/RecipeWall/RecipeWall";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecipeCardSmall from "../../Components/RecipeCardSmall/RecipeCardSmall";
import "./JournalEntries.scss";

function JournalEntries() {
  const [currentMealPlanId, setCurrentMealPlanId] = useState();
  const [currentMealPlanArray, setCurrentMealPlanArray] = useState([]);
  const [mealPlanRecipes, setMealPlanRecipes] = useState();
  const [
    isExistingEntryForCurrentMealPlan,
    setIsExistingEntryForCurrentMealPlan,
  ] = useState(false);
  const [journalEntry, setJournalEntry] = useState({
    comment: "",
    energy: 5,
    sleep: 5,
    mood: 5,
  });

  const fetchMostRecentMealPlanData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/mealplans/2922c286-16cd-4d43-ab98-c79f698aeab0`
      );
      // console.log(response.data[0]);
      setCurrentMealPlanId(response.data[0].id);
      setCurrentMealPlanArray(response.data[0].meal_plan);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchRecipesSearchData = async (queryString) => {
    try {
      const queryObj = {
        query: queryString,
      };
      const response = await axios.post(
        `http://localhost:8080/api/recipes/bulk`,
        queryObj
      );
      setMealPlanRecipes(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const postJournalEntry = async () => {
    try {
      const journalObj = {
        mealplan_id: currentMealPlanId,
        users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
        comment: journalEntry.comment,
        energy: journalEntry.energy,
        sleep: journalEntry.sleep,
        mood: journalEntry.mood,
      };
      const response = await axios.post(
        `http://localhost:8080/api/journalentries`,
        journalObj
      );
    } catch (err) {
      console.log(err);
    }
  };

  let navigate = useNavigate();

  // search for a journal entry with the foreign id of the current meal plan, if there is one, then write you can't enter a journal entry
  const fetchJournalEntries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/journalentries/2922c286-16cd-4d43-ab98-c79f698aeab0`
      );

      // find journal entry with current meal plan id
      const foundJournalEntry = response.data.find(
        (entry) => entry.mealplan_id === currentMealPlanId
      );

      if (foundJournalEntry) {
        setIsExistingEntryForCurrentMealPlan(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMostRecentMealPlanData();
    fetchJournalEntries();
    if (currentMealPlanArray.length > 0) {
      const query = currentMealPlanArray.split(", ").join("%2C");
      fetchRecipesSearchData(query);
    }
  }, [currentMealPlanId]);

  const handleChange = (e) => {
    setJournalEntry({ ...journalEntry, [e.target.name]: e.target.value });
  };

  const notify = () => toast("Journal Entry Added.");

  const handleSubmit = (e) => {
    e.preventDefault();

    // form validation 1.
    if (journalEntry.comment === "") {
      alert("Please enter a comment for this journal entry.");
    } else {
      postJournalEntry();

      notify();

      setTimeout(() => {
        navigate("/nutritiondata");
      }, 3000);
    }
  };

  return (
    <section className="journal-entries">
      <h1>Journal Entries</h1>
      <section className="journal__recipes-wall">
        <h2>Most recently confirmed mealplan </h2>
        <div className="journal__recipe-wall">
          {mealPlanRecipes &&
            mealPlanRecipes.map((recipe) => {
              return <RecipeCardSmall key={recipe.id} recipe={recipe} />;
            })}
        </div>
      </section>
      <section>
        <h2>Write a Journal Entry</h2>
        <p>
          {isExistingEntryForCurrentMealPlan
            ? "A Journal Entry exists for the latest meal plan. Please create another meal plan before writing a new entry."
            : "Reflect on your previous week. How have you felt with your energy, sleep, and mood after eating the above meals?"}
        </p>
        <form>
          <div className="journal-form">
            <label htmlFor="energy">
              Energy: {journalEntry.energy}
              <input
                disabled={isExistingEntryForCurrentMealPlan || ""}
                type="range"
                name="energy"
                min="1"
                max="10"
                onChange={handleChange}
                value={journalEntry.energy}
              />
            </label>
            <label htmlFor="energy">
              Sleep Quality: {journalEntry.sleep}
              <input
                disabled={isExistingEntryForCurrentMealPlan || ""}
                type="range"
                name="sleep"
                min="1"
                max="10"
                onChange={handleChange}
                value={journalEntry.sleep}
              />
            </label>
            <label htmlFor="energy">
              Mood: {journalEntry.mood}
              <input
                disabled={isExistingEntryForCurrentMealPlan || ""}
                type="range"
                name="mood"
                min="1"
                max="10"
                onChange={handleChange}
                value={journalEntry.mood}
              />
            </label>
          </div>
          <label htmlFor="comment">
            Journal Note
            <textarea
              disabled={isExistingEntryForCurrentMealPlan || ""}
              name="comment"
              id=""
              cols="30"
              rows="10"
              onChange={handleChange}
              placeholder="A place for any notes relevant to your entry for the week."
              value={journalEntry.comment}
            />
          </label>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isExistingEntryForCurrentMealPlan || ""}
          >
            Enter Journal Entry
          </button>
        </form>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </section>
    </section>
  );
}

export default JournalEntries;
