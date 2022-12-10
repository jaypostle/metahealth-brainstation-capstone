/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("nutritiondata", (table) => {
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
    table.string("nutrition_type").notNullable();
    table.integer("nutrition_volume").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("nutritiondata");
};
