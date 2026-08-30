require("dotenv").config();

const env = {
  server: {
    host: process.env.HOST || "localhost",
    port: Number(process.env.PORT) || 3000,
  },

  database: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    name: process.env.DB_NAME,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  },

  bcrypt: {
    saltRounds: Number(process.env.SALT_ROUNDS) || 12,
  },
};

module.exports = env;
