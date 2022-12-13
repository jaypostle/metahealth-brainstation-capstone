/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("journalentries").del();
  await knex("journalentries").insert([
    {
      id: "bb69bdc6-e09c-498d-8abd-be2792504d00", // make unique
      mealplan_id: "9b4f79ea-0e6c-4e59-8e05-afd933d0b3d3",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      comment: "Journal entry comment goes here.",
      energy: 5,
      sleep: 7,
      mood: 10,
    },
    {
      id: "124a43ce-78b0-4d80-91b9-11f9ced631a7",
      mealplan_id: "83433026-ca32-4c6d-bd86-a39ee8b7303e",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      comment: "Journal entry comment goes here.",
      energy: 3,
      sleep: 1,
      mood: 3,
    },
    {
      id: "64d64dd4-90b8-4330-91e0-bd1217811bd9",
      mealplan_id: "a193a6a7-42ab-4182-97dc-555ee85e7486",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      comment: "Journal entry comment goes here.",
      energy: 8,
      sleep: 6,
      mood: 7,
    },
    {
      id: "4a8c0ba6-0ecb-4a7d-ab7f-2dbbd1d437b1",
      mealplan_id: "8f16bd30-bab5-40af-aca2-b63d5fdd1acc",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      comment: "Journal entry comment goes here.",
      energy: 4,
      sleep: 5,
      mood: 6,
    },
  ]);
};
