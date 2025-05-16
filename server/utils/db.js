const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

async function queryDatabase(sql) {
  const res = await pool.query(sql);
  return res.rows;
}

module.exports = { queryDatabase };