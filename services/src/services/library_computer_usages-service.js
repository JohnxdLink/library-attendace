const db = require("../config/database.js");
const {
  CREATE_LIBRARY_COMPUTER_USAGES,
  FIND_ALL_LIBRARY_COMPUTER_USAGES,
  FIND_LIBRARY_COMPUTER_USAGES_BY_ID,
  UPDATE_LIBRARY_COMPUTER_USAGES,
  DELETE_LIBRARY_COMPUTER_USAGES,
} = require("../database/queries/library_computer_usages-query.js");

// CREATE
const createLibraryComputerUsage = async (student_id, computer_id, usage_date, time_in, time_out, purpose) => {
  if (!student_id || !computer_id || !usage_date || !time_in) {
    throw new Error("Student ID, computer ID, usage date, and time in are required.");
  }

  const [result] = await db.query(CREATE_LIBRARY_COMPUTER_USAGES, [
    student_id,
    computer_id,
    usage_date,
    time_in,
    time_out,
    purpose,
  ]);

  return result;
};

// READ - Get all library computer usages
const findAllLibraryComputerUsages = async () => {
  const [rows] = await db.query(FIND_ALL_LIBRARY_COMPUTER_USAGES);

  return rows;
};

// READ - Get library computer usage by ID
const findLibraryComputerUsageById = async (id) => {
  if (!id) {
    throw new Error("Library Computer Usage ID is required.");
  }

  const [rows] = await db.query(FIND_LIBRARY_COMPUTER_USAGES_BY_ID, [id]);

  return rows[0] || null;
};

// UPDATE
const updateLibraryComputerUsage = async (id, student_id, computer_id, usage_date, time_in, time_out, purpose) => {
  if (!id || !student_id || !computer_id || !usage_date || !time_in) {
    throw new Error("Library Computer Usage ID, student ID, computer ID, usage date, and time in are required.");
  }

  const [result] = await db.query(UPDATE_LIBRARY_COMPUTER_USAGES, [
    student_id,
    computer_id,
    usage_date,
    time_in,
    time_out,
    purpose,
    id,
  ]);

  return result;
};

// DELETE
const deleteLibraryComputerUsage = async (library_computer_usage_id) => {
  if (!library_computer_usage_id) {
    throw new Error("Library Computer Usage ID is required.");
  }

  const [result] = await db.query(DELETE_LIBRARY_COMPUTER_USAGES, [library_computer_usage_id]);

  return result;
};

module.exports = {
  createLibraryComputerUsage,
  findAllLibraryComputerUsages,
  findLibraryComputerUsageById,
  updateLibraryComputerUsage,
  deleteLibraryComputerUsage,
};
