/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("nutritiondata").del();
  await knex("nutritiondata").insert([
    {
      id: "bdc6bb69-e09c-498d-8abd-be2792504d00", // make unique
      mealplan_id: "9b4f79ea-0e6c-4e59-8e05-afd933d0b3d3",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      nutrition_type: "Iron",
      nutrition_volume: 5,
    },
    {
      id: "3ce124a4-78b0-4d80-91b9-11f9ced631a7",
      mealplan_id: "83433026-ca32-4c6d-bd86-a39ee8b7303e",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      nutrition_type: "Iron",
      nutrition_volume: 8,
    },
    {
      id: "4dd464d6-90b8-4330-91e0-bd1217811bd9",
      mealplan_id: "a193a6a7-42ab-4182-97dc-555ee85e7486",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      nutrition_type: "Iron",
      nutrition_volume: 9,
    },
    {
      id: "c0ba64a8-0ecb-4a7d-ab7f-2dbbd1d437b1",
      mealplan_id: "8f16bd30-bab5-40af-aca2-b63d5fdd1acc",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      nutrition_type: "Iron",
      nutrition_volume: 3,
    },
    {
      id: "bb69bdc6-e09c-498d-bd8a-be2792504d00",
      mealplan_id: "9b4f79ea-0e6c-4e59-8e05-afd933d0b3d3",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      nutrition_type: "Magnesium",
      nutrition_volume: 250,
    },
    {
      id: "3ce124a4-78b0-4d80-b991-11f9ced631a7",
      mealplan_id: "83433026-ca32-4c6d-bd86-a39ee8b7303e",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      nutrition_type: "Magnesium",
      nutrition_volume: 300,
    },
    {
      id: "4dd464d6-90b8-4330-e091-bd1217811bd9",
      mealplan_id: "a193a6a7-42ab-4182-97dc-555ee85e7486",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      nutrition_type: "Magnesium",
      nutrition_volume: 325,
    },
    {
      id: "c0ba64a8-0ecb-4a7d-7fab-2dbbd1d437b1",
      mealplan_id: "8f16bd30-bab5-40af-aca2-b63d5fdd1acc",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      nutrition_type: "Magnesium",
      nutrition_volume: 275,
    },
    // zinc
    {
      id: "bb6bdc96-e09c-498d-bd8a-be7925204d00",
      mealplan_id: "9b4f79ea-0e6c-4e59-8e05-afd933d0b3d3",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      nutrition_type: "Zinc",
      nutrition_volume: 3,
    },
    {
      id: "3ce124a4-78b0-4d80-b991-11f319ced6a7",
      mealplan_id: "83433026-ca32-4c6d-bd86-a39ee8b7303e",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      nutrition_type: "Zinc",
      nutrition_volume: 5,
    },
    {
      id: "4dd464d6-90b8-4330-e901-bd2178111bd9",
      mealplan_id: "a193a6a7-42ab-4182-97dc-555ee85e7486",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      nutrition_type: "Zinc",
      nutrition_volume: 6,
    },
    {
      id: "c0ba64a8-0ecb-4a7d-7fab-2d437bbd1db1",
      mealplan_id: "8f16bd30-bab5-40af-aca2-b63d5fdd1acc",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      nutrition_type: "Zinc",
      nutrition_volume: 7,
    },

    // calcium
    {
      id: "bb69bdc6-e09c-498d-bd8a-be5042792d00",
      mealplan_id: "9b4f79ea-0e6c-4e59-8e05-afd933d0b3d3",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      nutrition_type: "Calcium",
      nutrition_volume: 225,
    },
    {
      id: "3ce124a4-78b0-4d80-b991-1ed1f9c631a7",
      mealplan_id: "83433026-ca32-4c6d-bd86-a39ee8b7303e",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      nutrition_type: "Calcium",
      nutrition_volume: 435,
    },
    {
      id: "4dd464d6-90b8-4330-e091-b1781d121bd9",
      mealplan_id: "a193a6a7-42ab-4182-97dc-555ee85e7486",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      nutrition_type: "Calcium",
      nutrition_volume: 375,
    },
    {
      id: "c0ba64a8-0ecb-4a7d-7fab-2dbd43bd17b1",
      mealplan_id: "8f16bd30-bab5-40af-aca2-b63d5fdd1acc",
      users_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      nutrition_type: "Calcium",
      nutrition_volume: 265,
    },
  ]);
};
