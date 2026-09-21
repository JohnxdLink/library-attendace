// CREATE
const CREATE_BOARD_GAME = `
  INSERT INTO board_games (game_name, description, quantity, status)
  VALUES (?, ?, ?, ?)
`;

// READ - Get all records
const FIND_ALL_BOARD_GAMES = `
  SELECT
    bg.id,
    bg.game_name,
    bg.description,
    bg.quantity,
    bg.status,
    bg.created_at,
    bg.updated_at
  FROM board_games AS bg
  ORDER BY bg.id DESC
`;

// READ - Get record by ID
const FIND_BOARD_GAME_BY_ID = `
  SELECT
    bg.id,
    bg.game_name,
    bg.description,
    bg.quantity,
    bg.status,
    bg.created_at,
    bg.updated_at
  FROM board_games AS bg
  WHERE bg.id = ?
`;

// UPDATE
const UPDATE_BOARD_GAME = `
  UPDATE board_games AS bg
  SET
    bg.game_name = ?,
    bg.description = ?,
    bg.quantity = ?,
    bg.status = ?,
  WHERE bg.id = ?
`;

// DELETE
const DELETE_BOARD_GAME = `
  DELETE FROM board_games
  WHERE id = ?
`;

module.exports = {
  CREATE_BOARD_GAME,
  FIND_ALL_BOARD_GAMES,
  FIND_BOARD_GAME_BY_ID,
  UPDATE_BOARD_GAME,
  DELETE_BOARD_GAME,
};
