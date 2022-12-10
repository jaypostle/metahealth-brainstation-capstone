const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

exports.index = (_req, res) => {
  knex("mealplans")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Meal Plans: ${err}`)
    );
};

// All Meal Plans by User
exports.allMealplansByUser = (req, res) => {
  knex("mealplans")
    .where({ users_id: req.params.userId })
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
          `Error retrieving meal plans from user ${req.params.userId} ${err}`
        )
    );
};

// Post a meal plan by user
exports.addMealPlan = (req, res) => {
  // Validate the request body for required data
  if (!req.body.users_id || !req.body.meal_plan) {
    return res
      .status(400)
      .send(
        "Please make sure to provide a user id and meal plan field in a request"
      );
  }

  const newMealplanId = uuidv4();
  knex("mealplans")
    .insert({ ...req.body, id: newMealplanId })
    .then((_data) => {
      knex("mealplans")
        .where({ id: newMealplanId })
        .then((data) => {
          res.status(201).json(data[0]);
        });
    })
    .catch((err) => res.status(400).send(`Error creating meal plan: ${err}`));
};
