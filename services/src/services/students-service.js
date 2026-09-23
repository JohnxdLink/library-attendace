const db = require("../config/database.js");
const {
  CREATE_STUDENTS,
  FIND_ALL_STUDENTS,
  FIND_STUDENTS_BY_ID,
  UPDATE_STUDENTS,
  DELETE_STUDENTS,
} = require("../database/queries/students-query.js");

// CREATE
const createStudents = async (
  grade_section_id,
  account_id,
  lastname,
  firstname,
  middlename,
  contact_no,
  created_at,
  updated_at,
) => {
  if (!grade_section_id || !account_id || !contact_no) {
    throw new Error("Grade section id, account id, and contact no are required.");
  }

  const [result] = await db.query(CREATE_STUDENTS, [
    grade_section_id,
    account_id,
    lastname,
    firstname,
    middlename,
    contact_no,
    created_at,
    updated_at,
  ]);

  return result;
};

// READ - Get all library staff duties
const findAllStudents = async () => {
  const [rows] = await db.query(FIND_ALL_STUDENTS);

  return rows;
};

// READ - Get library staff duty by ID
const findStudentsById = async (id) => {
  if (!id) {
    throw new Error("Students ID is required.");
  }

  const [rows] = await db.query(FIND_STUDENTS_BY_ID, [id]);

  return rows[0] || null;
};

// UPDATE
const updateStudents = async (
  id,
  grade_section_id,
  account_id,
  lastname,
  middlename,
  contact_no,
  created_at,
  updated_at,
) => {
  if (!id || !grade_section_id || !account_id || !contact_no) {
    throw new Error("Students ID, grade section ID, account ID, and contact no are required.");
  }

  const [result] = await db.query(UPDATE_STUDENTS, [
    grade_section_id,
    account_id,
    lastname,
    firstname,
    middlename,
    contact_no,
    created_at,
    updated_at,
    id,
  ]);

  return result;
};

// DELETE
const deleteStudents = async (Students_id) => {
  if (!students_id) {
    throw new Error("Students ID is required.");
  }

  const [result] = await db.query(DELETE_STUDENTS, [students_id]);

  return result;
};

module.exports = {
  createStudents,
  findAllStudents,
  findStudentsById,
  updateStudents,
  deleteStudents,
};
