exports.up = function(knex) {
  return knex.schema.table("blocks", table => {
    table.integer("index").nullable();
    table.timestamp("timestamp").nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table("blocks", table => {
    table.dropColumn("index");
    table.dropColumn("timestamp");
  });
};