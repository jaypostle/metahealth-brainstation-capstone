const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

exports.index = (_req, res) => {
  knex("journalentries")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Meal Plans: ${err}`)
    );
};

// All Meal Plans by User
exports.allJournalEntriesByUser = (req, res) => {
  knex("journalentries")
    .where({ users_id: req.params.userId })
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
          `Error retrieving meal plans from user ${req.params.userId} ${err}`
        )
    );
};

// Post a meal plan by user
exports.addJournalEntry = (req, res) => {
  // Validate the request body for required data
  if (
    !req.body.users_id ||
    !req.body.comment ||
    !req.body.energy ||
    !req.body.sleep ||
    !req.body.mood
  ) {
    return res
      .status(400)
      .send(
        "Please make sure to provide a user id, comment, energy, sleep, and mood field in a request"
      );
  }

  const newJournalEntryId = uuidv4();
  knex("journalentries")
    .insert({ ...req.body, id: newJournalEntryId })
    .then((_data) => {
      knex("journalentries")
        .where({ id: newJournalEntryId })
        .then((data) => {
          res.status(201).json(data[0]);
        });
    })
    .catch((err) =>
      res.status(400).send(`Error creating journal entry: ${err}`)
    );
};
