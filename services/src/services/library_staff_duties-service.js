const db = require("../config/database.js");
const {
  CREATE_LIBRARY_STAFF_DUTIES,
  FIND_ALL_LIBRARY_STAFF_DUTIES,
  FIND_LIBRARY_STAFF_DUTIES_BY_ID,
  UPDATE_LIBRARY_STAFF_DUTIES,
  DELETE_LIBRARY_STAFF_DUTIES,
} = require("../database/queries/library_staff_duties-query.js");

// CREATE
const createLibraryStaffDuty = async (staff_id, duty_date, time_in, time_out, remarks) => {
  if (!staff_id || !duty_date || !time_in) {
    throw new Error("Staff ID, duty date, and time in are required.");
  }

  const [result] = await db.query(CREATE_LIBRARY_STAFF_DUTIES, [staff_id, duty_date, time_in, time_out, remarks]);

  return result;
};

// READ - Get all library staff duties
const findAllLibraryStaffDuties = async () => {
  const [rows] = await db.query(FIND_ALL_LIBRARY_STAFF_DUTIES);

  return rows;
};

// READ - Get library staff duty by ID
const findLibraryStaffDutyById = async (id) => {
  if (!id) {
    throw new Error("Library Staff Duty ID is required.");
  }

  const [rows] = await db.query(FIND_LIBRARY_STAFF_DUTIES_BY_ID, [id]);

  return rows[0] || null;
};

// UPDATE
const updateLibraryStaffDuty = async (id, staff_id, duty_date, time_in, time_out, remarks) => {
  if (!id || !staff_id || !duty_date || !time_in) {
    throw new Error("Library Staff Duty ID, staff ID, duty date, and time in are required.");
  }

  const [result] = await db.query(UPDATE_LIBRARY_STAFF_DUTIES, [staff_id, duty_date, time_in, time_out, remarks, id]);

  return result;
};

// DELETE
const deleteLibraryStaffDuty = async (id) => {
  if (!id) {
    throw new Error("Library Staff Duty ID is required.");
  }

  const [result] = await db.query(DELETE_LIBRARY_STAFF_DUTIES, [id]);

  return result;
};

module.exports = {
  createLibraryStaffDuty,
  findAllLibraryStaffDuties,
  findLibraryStaffDutyById,
  updateLibraryStaffDuty,
  deleteLibraryStaffDuty,
};
