const { query } = require("express");
const { Pool } = require("pg");
require("dotenv").config({ path:'../../.env' });

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// console.log(process.env.DB_USER)
// console.log(process.env.DB_NAME)
// console.log(process.env.DB_PASSWORD)
// console.log(process.env.DB_PORT)

module.exports = {
  query: (text, params) => pool.query(text, params),
};
