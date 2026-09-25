const db = require("../config/database.js");
const {
  CREATE_BOARD_GAME,
  FIND_ALL_BOARD_GAMES,
  FIND_BOARD_GAME_BY_ID,
  UPDATE_BOARD_GAME,
  DELETE_BOARD_GAME,
} = require("../database/queries/board_games-query.js");

// CREATE
const createBoardGame = async (game_name, description, quantity, status) => {
  if (!game_name || quantity === 0) {
    throw new Error("Game name and quantity are required.");
  }

  const [result] = await db.query(CREATE_BOARD_GAME, [game_name, description, quantity, status]);

  return result;
};

// READ - Get all board games
const findAllBoardGames = async () => {
  const [rows] = await db.query(FIND_ALL_BOARD_GAMES);

  return rows;
};

// READ - Get board game by ID
const findBoardGameById = async (id) => {
  if (!id) {
    throw new Error("Board Game ID is required.");
  }

  const [rows] = await db.query(FIND_BOARD_GAME_BY_ID, [id]);

  return rows[0] || null;
};

// UPDATE
const updateBoardGame = async (id, game_name, description, quantity, status) => {
  if (!id || !game_name || quantity === undefined || quantity === null) {
    throw new Error("Board Game ID, game name, and quantity are required.");
  }

  const [result] = await db.query(UPDATE_BOARD_GAME, [game_name, description, quantity, status, id]);

  return result;
};

// DELETE
const deleteBoardGame = async (id) => {
  if (!id) {
    throw new Error("Board Game ID is required.");
  }

  const [result] = await db.query(DELETE_BOARD_GAME, [id]);

  return result;
};

module.exports = {
  createBoardGame,
  findAllBoardGames,
  findBoardGameById,
  updateBoardGame,
  deleteBoardGame,
};
