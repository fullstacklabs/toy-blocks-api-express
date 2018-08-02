exports.up = function(knex, Promise) {
  return knex.schema.createTable("peers", function(table) {
    table.increments('id').primary();
    table.text("url").notNull();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("peers");
};
