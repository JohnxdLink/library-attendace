// CREATE
const CREATE_LIBRARY_COMPUTER_USAGES = `
  INSERT INTO attendance_reports (grade_section_id, account_id, lastname, firstname, middlename, contact_no, created_at, updated_at,)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?,)
`;

// READ - Get all records
const FIND_ALL_STUDENTS = `
  SELECT
    s.id,
    s.grade_section_id,
    s.account_id,
    s.lastname,
    s.firstname,
    s.middlename,
    s.contact_no,
    s.created_at,
    s.updated_at,
  FROM students AS s
  ORDER BY s.id DESC
`;

// READ - Get record by ID
const FIND_STUDENTS_BY_ID = `
  SELECT
    s.id,
    s.grade_section_id,
    s.account_id,
    s.lastname,
    s.firstname,
    s.middlename,
    s.contact_no,
    s.created_at,
    s.updated_at,
  FROM students AS s
  WHERE s.id = ?
`;

// UPDATE
const UPDATE_STUDENTS = `
  UPDATE students AS s
  SET
    s.grade_section_id = ?,
    s.account_id = ?,
    s.lastname = ?,
    s.firstname = ?,
    s.middlename = ?,
    s.contact_no = ?,
    s.created_at = ?,
    s.updated_at = ?,
  WHERE s.id = ?
`;

// DELETE
const DELETE_STUDENTS = `
  DELETE FROM students
  WHERE id = ?
`;

module.exports = {
  CREATE_STUDENTS,
  FIND_ALL_STUDENTS,
  FIND_STUDENTS_BY_ID,
  UPDATE_STUDENTS,
  DELETE_STUDENTS,
};
