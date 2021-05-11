const knex = require('knex');

const connectedKnex = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './db/invest.sqlite3', // for running database from root directory
    // filename: '../db/invest.sqlite3',   for running database from 'backend' directory
  },
});

module.exports = connectedKnex;
