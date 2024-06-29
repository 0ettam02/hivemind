const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hivemind',
  password: 'matteo',
  port: 5432,
});

module.exports = pool;
