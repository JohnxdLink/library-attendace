const mysql = require("mysql2/promise");
const env = require("./env.js");

const db = mysql.createPool({
  host: env.database.host,
  port: env.database.port,
  user: env.database.user,
  password: env.database.password,
  database: env.database.name,
});

module.exports = db;
