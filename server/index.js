require("dotenv").config();
const express = require("express");

const cors = require("cors");
const app = express();

// const of routes
const recipeRouter = require("./routes/recipesRoute");
const mealPlansRouter = require("./routes/mealplansRoute");
const nutritionDataRouter = require("./routes/nutritiondataRoute");
const journalEntryRouter = require("./routes/journalEntryRoute");

/**
 * Middlware
 */

app.use(cors());
app.use(express.json());

// ** Routes **//

app.use("/api/recipes", recipeRouter);
app.use("/api/mealplans", mealPlansRouter);
app.use("/api/nutritiondata", nutritionDataRouter);
app.use("/api/journalentries", journalEntryRouter);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
