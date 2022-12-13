const express = require("express");
const router = express.Router();

const path = require("node:path");

const journalController = require("../controllers/journalController");

router.route("/").get(journalController.index);

router.route("/:userId").get(journalController.allJournalEntriesByUser);

// post a meal plan
router.route("/").post(journalController.addJournalEntry);

module.exports = router;
