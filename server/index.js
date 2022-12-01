require("dotenv").config();
const express = require("express");

const cors = require("cors");
const app = express();


/**
 * Middlware
 */

app.use(cors());
app.use(express.json());



// ** Routes **//

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});