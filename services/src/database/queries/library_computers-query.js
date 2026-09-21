// CREATE
const CREATE_LIBRARY_COMPUTER = `
  INSERT INTO attendance_reports (computer_number, status, created_at, updated_at)
  VALUES (?, ?, ?, ?,)
`;

// READ - Get all records
const FIND_ALL_LIBRARY_COMPUTER = `
  SELECT
    lc.id,
    lc.computer_number,
    lc.status,
    lc.created_at,
    lc.updated_at,
  FROM library_computer AS lc
  ORDER BY lc.id DESC
`;

// READ - Get record by ID
const FIND_LIBRARY_COMPUTER_BY_ID = `
  SELECT
    lc.id,
    lc.computer_number,
    lc.status,
    lc.created_at,
    lc.updated_at,
  FROM library_computer AS lc
  WHERE lc.id = ?
`;

// UPDATE
const UPDATE_LIBRARY_COMPUTER = `
  UPDATE library_computer AS lc
  SET
    lc.computer_number = ?,
    lc.status = ?,
    lc.created_at = ?,
    lc.updated_at = ?,
  WHERE lc.id = ?
`;

// DELETE
const DELETE_LIBRARY_COMPUTER_USAGES = `
  DELETE FROM library_computer
  WHERE id = ?
`;

module.exports = {
  CREATE_LIBRARY_COMPUTER,
  FIND_ALL_LIBRARY_COMPUTER,
  FIND_LIBRARY_COMPUTER_BY_ID,
  UPDATE_LIBRARY_COMPUTER,
  DELETE_LIBRARY_COMPUTER,
};
