const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const db = require("./config/database.js");
const authRoutes = require("./routes/auth-routes.js");
const accountsRoutes = require("./routes/accounts-routes.js");

const app = express();

const PROJECT_ROOT = path.join(__dirname, "../..");

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(PROJECT_ROOT));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "backend",
    status: "online",
  });
});

app.get("/api/health/db", async (req, res) => {
  try {
    const [result] = await db.query("SELECT 1 AS connected");

    res.status(StatusCodes.OK).json({
      success: true,
      database: "online",
      result,
    });
  } catch (error) {
    console.error("Database error:", error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      database: "offline",
      error: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
});

app.use("/api", authRoutes);
app.use("/api/accounts", accountsRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(PROJECT_ROOT, "index.html"));
});

module.exports = app;
