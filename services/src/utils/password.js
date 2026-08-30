const bcrypt = require("bcryptjs");
const env = require("../config/env.js");

async function hashPassword(password) {
  return await bcrypt.hash(password, env.bcrypt.saltRounds);
}

async function comparePassword(password, hashedPassword) {
  return await bcrypt.comparePassword(password, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
