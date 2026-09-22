// CREATE
const CREATE_LIBRARY_COMPUTER_USAGES = `
  INSERT INTO attendance_reports (student_id, attendance_id, reported_by, report_type, description, status, report_date, action_taken)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

// READ - Get all records
const FIND_ALL_LIBRARY_COMPUTER_USAGES = `
  SELECT
    lcu.id,
    lcu.student_id,
    lcu.computer_id,
    lcu.usage_date,
    lcu.time_in,
    lcu.time_out,
    lcu.purpose,
    lcu.created_at,
    lcu.updated_at
  FROM library_computer_usages AS lcu
  ORDER BY lcu.id DESC
`;

// READ - Get record by ID
const FIND_LIBRARY_COMPUTER_USAGES_BY_ID = `
  SELECT
    lcu.id,
    lcu.student_id,
    lcu.computer_id,
    lcu.usage_date,
    lcu.time_in,
    lcu.time_out,
    lcu.purpose,
    lcu.created_at,
    lcu.updated_at
  FROM library_computer_usages AS lcu
  WHERE lcu.id = ?
`;

// UPDATE
const UPDATE_LIBRARY_COMPUTER_USAGES = `
  UPDATE library_computer_usages AS lcu
  SET
    lcu.student_id = ?,
    lcu.computer_id = ?,
    lcu.usage_date = ?,
    lcu.time_in = ?,
    lcu.time_out = ?,
    lcu.purpose = ?,
    lcu.created_at = ?,
    lcu.updated_at = ?
  WHERE lcu.id = ?
`;

// DELETE
const DELETE_LIBRARY_COMPUTER_USAGES = `
  DELETE FROM library_coputer_usages
  WHERE id = ?
`;

module.exports = {
  CREATE_LIBRARY_COMPUTER_USAGES,
  FIND_ALL_LIBRARY_COMPUTER_USAGES,
  FIND_LIBRARY_COMPUTER_USAGES_BY_ID,
  UPDATE_LIBRARY_COMPUTER_USAGES,
  DELETE_LIBRARY_COMPUTER_USAGES,
};
