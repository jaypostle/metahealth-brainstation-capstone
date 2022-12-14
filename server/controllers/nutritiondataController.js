const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

exports.index = (_req, res) => {
  knex("nutritiondata")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Meal Plans: ${err}`)
    );
};

// all nutrition data by user
exports.allNutritionByUser = (req, res) => {
  knex("nutritiondata")
    .where({
      users_id: req.params.userId,
    })
    .orderBy("created_at", "asc")
    .then((data) => {
      // If record is not found, respond with 404
      if (!data.length) {
        return res
          .status(404)
          .send(`Record with id: ${req.params.userId} is not found`);
      }

      // Knex returns an array of records, so we need to send response with a single object only
      res.status(200).json(data);
    })
    .catch((err) =>
      res
        .status(400)
        .send(
          `Error retrieving single nutrition data point from user ${req.params.userId} ${err}`
        )
    );
};

// all nutrition data by user and nutrition type
exports.allNutritionByUserByType = (req, res) => {
  knex("nutritiondata")
    .where({
      users_id: req.params.userId,
      nutrition_type: req.params.nutritionType,
    })
    .orderBy("created_at", "asc")
    .then((data) => {
      // If record is not found, respond with 404
      if (!data.length) {
        return res
          .status(404)
          .send(`Record with id: ${req.params.userId} is not found`);
      }

      // Knex returns an array of records, so we need to send response with a single object only
      res.status(200).json(data);
    })
    .catch((err) =>
      res
        .status(400)
        .send(
          `Error retrieving single nutrition data point from user ${req.params.userId} ${err}`
        )
    );
};

// post a nutrition data point
// userid, nutrionttype, nutrition type and volume

exports.addNutritionData = (req, res) => {
  // Validate the request body for required data
  if (
    !req.body.users_id ||
    !req.body.mealplan_id ||
    !req.body.nutrition_type ||
    !req.body.nutrition_volume
  ) {
    return res
      .status(400)
      .send(
        "Please make sure to provide a user id and meal plan id and nutrition type/volume field in a request"
      );
  }

  const newNutritionDataPointId = uuidv4();
  knex("nutritiondata")
    .insert({ ...req.body, id: newNutritionDataPointId })
    .then((_data) => {
      knex("nutritiondata")
        .where({ id: newNutritionDataPointId })
        .then((data) => {
          res.status(201).json(data[0]);
        });
    })
    .catch((err) =>
      res.status(400).send(`Error creating nutrition data point: ${err}`)
    );
};
