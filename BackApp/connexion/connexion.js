const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PerfectMeal',
    password: 'password',
    port: 5432,
});

module.exports = { pool };