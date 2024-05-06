const { query } = require("express");
const { Pool } = require("pg");
require("dotenv").config({ path:'../../.env' });

const pool = new Pool({
  user: "postgres",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: "localhost",
  database: "Arcadia",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
