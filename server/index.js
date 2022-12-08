require("dotenv").config();
const express = require("express");

const cors = require("cors");
const app = express();

// const of routes
const recipeRouter = require("./routes/recipes");

/**
 * Middlware
 */

app.use(cors());
app.use(express.json());

// ** Routes **//

app.use("/api/recipes", recipeRouter);



const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
