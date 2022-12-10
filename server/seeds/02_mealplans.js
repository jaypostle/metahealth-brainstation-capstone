/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("mealplans").del();
  await knex("mealplans").insert([
    {
      id: "9b4f79ea-0e6c-4e59-8e05-afd933d0b3d3",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      meal_plan: "877234, 434380, 943432",
    },
    {
      id: "83433026-ca32-4c6d-bd86-a39ee8b7303e",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      meal_plan: "1515821, 648247, 665379",
    },
    {
      id: "a193a6a7-42ab-4182-97dc-555ee85e7486",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      meal_plan: "716429, 1515821, 661704",
    },
    {
      id: "8f16bd30-bab5-40af-aca2-b63d5fdd1acc",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      meal_plan: "662363, 659237, 642129",
    },
  ]);
};
