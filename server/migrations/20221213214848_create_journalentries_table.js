/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("journalentries", (table) => {
    table.uuid("id").primary();
    table
      .uuid("users_id")
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .uuid("mealplan_id")
      .references("mealplans.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("comment").notNullable();
    table.integer("energy").notNullable();
    table.integer("sleep").notNullable();
    table.integer("mood").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("journalentries");
};
