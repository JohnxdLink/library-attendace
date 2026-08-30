const jwt = require("jsonwebtoken");
const env = require("../config/env.js");

function generateToken(payload) {
  return jwt.sign(payload, env.jwt.secret, {
    expiresIn: EXPIRES_IN,
  });
}
function verifyToken(token) {
  return jwt.verify(token, env.jwt.secret);
}

module.exports = {
  generateToken,
  verifyToken,
};
