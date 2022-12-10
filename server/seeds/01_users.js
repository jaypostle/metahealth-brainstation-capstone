/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      username: "jaysonpostle",
      contact_email: "jayson@digital.com",
      password: "password",
    },
    {
      id: "5bf7bd6c-2b16-4129-bddc-9d37ff8539e9",
      username: "giorgia",
      contact_email: "giorgia@digital.com",
      password: "password",
    },
  ]);
};
