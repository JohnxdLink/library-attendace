const db = require("../config/database.js");
const {
  CREATE_STUDENT,
  FIND_ALL_STUDENTS,
  FIND_STUDENT_BY_ID,
  UPDATE_STUDENT,
  DELETE_STUDENT,
} = require("../database/queries/students-query.js");

// CREATE
const createStudent = async (grade_section_id, account_id, lastname, firstname, middlename, contact_no) => {
  if (!grade_section_id || !account_id || !contact_no) {
    throw new Error("Grade section id, account id, and contact no are required.");
  }

  const [result] = await db.query(CREATE_STUDENT, [
    grade_section_id,
    account_id,
    lastname,
    firstname,
    middlename,
    contact_no,
  ]);

  return result;
};

// READ - Get all library staff duties
const findAllStudents = async () => {
  const [rows] = await db.query(FIND_ALL_STUDENTS);

  return rows;
};

// READ - Get library staff duty by ID
const findStudentById = async (id) => {
  if (!id) {
    throw new Error("Students ID is required.");
  }

  const [rows] = await db.query(FIND_STUDENT_BY_ID, [id]);

  return rows[0] || null;
};

// UPDATE
const updateStudent = async (id, grade_section_id, account_id, lastname, firstname, middlename, contact_no) => {
  if (!id || !grade_section_id || !account_id) {
    throw new Error("Students ID, grade section ID, account ID, and contact no are required.");
  }

  const [result] = await db.query(UPDATE_STUDENT, [
    grade_section_id,
    account_id,
    lastname,
    firstname,
    middlename,
    contact_no,
    id,
  ]);

  return result;
};

// DELETE
const deleteStudent = async (id) => {
  if (!id) {
    throw new Error("Students ID is required.");
  }

  const [result] = await db.query(DELETE_STUDENT, [id]);

  return result;
};

module.exports = {
  createStudent,
  findAllStudents,
  findStudentById,
  updateStudent,
  deleteStudent,
};
