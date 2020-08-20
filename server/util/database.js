const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS
});
module.exports = pool;