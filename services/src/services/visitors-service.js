const db = require("../config/database.js");
const {
  CREATE_VISITORS,
  FIND_ALL_VISITORS,
  FIND_VISITORS_BY_ID,
  UPDATE_VISITORS,
  DELETE_VISITORS,
} = require("../database/queries/visitors-query.js");

// CREATE
const createVisitor = async (
  visitor_name,
  visitor_type,
  contact_no,
  purpose,
  person_to_visit,
  time_in,
  time_out,
  visit_date,
  remarks,
) => {
  if (!visitor_name || !visitor_type || !purpose || !visit_date || !time_in) {
    throw new Error("Visitor name, visitor type, purpose, visit date, and time in are required.");
  }

  const [result] = await db.query(CREATE_VISITORS, [
    visitor_name,
    visitor_type,
    contact_no,
    purpose,
    person_to_visit,
    time_in,
    time_out,
    visit_date,
    remarks,
  ]);

  return result;
};

// READ - Get all visitors
const findAllVisitors = async () => {
  const [rows] = await db.query(FIND_ALL_VISITORS);

  return rows;
};

// READ - Get visitor by ID
const findVisitorById = async (id) => {
  if (!id) {
    throw new Error("Visitor ID is required.");
  }

  const [rows] = await db.query(FIND_VISITORS_BY_ID, [id]);

  return rows[0] || null;
};

// UPDATE
const updateVisitor = async (
  id,
  visitor_name,
  visitor_type,
  contact_no,
  purpose,
  person_to_visit,
  time_in,
  time_out,
  visit_date,
  remarks,
) => {
  if (!id || !visitor_name || !visitor_type || !purpose || !visit_date || !time_in) {
    throw new Error("Visitor ID, visitor name, visitor type, purpose, visit date, and time in are required.");
  }

  const [result] = await db.query(UPDATE_VISITORS, [
    visitor_name,
    visitor_type,
    contact_no,
    purpose,
    person_to_visit,
    time_in,
    time_out,
    visit_date,
    remarks,
    id,
  ]);

  return result;
};

// DELETE
const deleteVisitor = async (visitor_id) => {
  if (!visitor_id) {
    throw new Error("Visitor ID is required.");
  }

  const [result] = await db.query(DELETE_VISITORS, [visitor_id]);

  return result;
};

module.exports = {
  createVisitor,
  findAllVisitors,
  findVisitorById,
  updateVisitor,
  deleteVisitor,
};
