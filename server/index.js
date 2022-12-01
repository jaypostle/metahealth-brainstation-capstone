require("dotenv").config();
const express = require("express");
const axios = require("axios");

const cors = require("cors");
const app = express();

/**
 * Middlware
 */

app.use(cors());
app.use(express.json());

// ** Routes **//

const apiURL = `https://api.spoonacular.com/recipes/716429/information?apiKey=${process.env.API_KEY}`;
// const apiURL = `https://api.spoonacular.com/recipes/716429/information?apiKey=92319c9df23f46b19c428982982f8055`;
const complexSearchURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}`;

const cuisine = "&cuisine=italian";
const pastaMaxFat = `${complexSearchURL}&query=pasta&maxFat=25`;

app.get("/recipe", async (req, res) => {
  try {
    const response = await axios.get(apiURL);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

app.get("/search", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
