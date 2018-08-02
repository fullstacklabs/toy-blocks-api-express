const path = require('path');
const Knex = require('knex');
const knexConfig = require('./../../knexfile');
knexConfig.migrations.directory = `${path.resolve(__dirname)}/../migrations`;
knexConfig.seeds.directory = `${path.resolve(__dirname)}/../seeds`;
const { Model } = require('objection');
const knex = Knex(knexConfig);
Model.knex(knex);

module.exports = {
  knex,
  getModel(modelName) {
    const model = require(`./../../src/models/${modelName}`);
    return model;
  },
  async resetDB(skipSeeder, tablesToDrop=[]) {
    try {
      const {migrate, seed} = knex;
      const dropAllTables = tablesToDrop.length > 0;
      const result = await knex.raw(
        'SELECT table_name from information_schema.tables where table_schema = \'public\''
      );
      await Promise.all(result.rows.map((row) => {
        const {table_name} = row;
        return (tablesToDrop.includes(table_name) || dropAllTables) ?
          knex.schema.dropTableIfExists(table_name) :
          Promise.resolve(true);
      }));
      await migrate.forceFreeMigrationsLock();
      await migrate.latest();
      if (!skipSeeder) {
        await seed.run();
      }
      return Promise.resolve(true);
    } catch (error) {
      console.log('Error', error);
      return Promise.resolve(true);
    }
  }
};