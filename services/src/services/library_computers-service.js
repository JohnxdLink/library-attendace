const db = require("../config/database.js");
const {
  CREATE_LIBRARY_COMPUTER,
  FIND_ALL_LIBRARY_COMPUTER,
  FIND_LIBRARY_COMPUTER_BY_ID,
  UPDATE_LIBRARY_COMPUTER,
  DELETE_LIBRARY_COMPUTER,
} = require("../database/queries/library_computer-query.js");

// CREATE
const createLibraryComputer = async (computer_number, status) => {
  if (!computer_number || !status) {
    throw new Error("Computer number and status are required.");
  }

  const [result] = await db.query(CREATE_LIBRARY_COMPUTER, [computer_number, status]);

  return result;
};

// READ - Get all library computers
const findAllLibraryComputers = async () => {
  const [rows] = await db.query(FIND_ALL_LIBRARY_COMPUTER);

  return rows;
};

// READ - Get library computer by ID
const findLibraryComputerById = async (id) => {
  if (!id) {
    throw new Error("Library Computer ID is required.");
  }

  const [rows] = await db.query(FIND_LIBRARY_COMPUTER_BY_ID, [id]);

  return rows[0] || null;
};

// UPDATE
const updateLibraryComputer = async (id, computer_number, status) => {
  if (!id || !computer_number || !status) {
    throw new Error("Library Computer ID, computer number, and status are required.");
  }

  const [result] = await db.query(UPDATE_LIBRARY_COMPUTER, [computer_number, status, id]);

  return result;
};

// DELETE
const deleteLibraryComputer = async (library_computer_id) => {
  if (!library_computer_id) {
    throw new Error("Library Computer ID is required.");
  }

  const [result] = await db.query(DELETE_LIBRARY_COMPUTER, [library_computer_id]);

  return result;
};

module.exports = {
  createLibraryComputer,
  findAllLibraryComputers,
  findLibraryComputerById,
  updateLibraryComputer,
  deleteLibraryComputer,
};
