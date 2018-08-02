exports.up = function(knex, Promise) {
  return knex.schema.createTable("blocks", function(table) {
    table.increments('id').primary();
    table.text("data").notNull();
    table.text("current_hash").notNull();
    table.text("previous_hash").notNull();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("blocks");
};
