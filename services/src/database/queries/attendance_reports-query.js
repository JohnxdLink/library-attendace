// CREATE
const CREATE_ATTENDANCE_REPORTS = `
  INSERT INTO attendance_reports (student_id, attendance_id, reported_by, report_type, description, status, report_date, action_taken)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

// READ - Get all records
const FIND_ALL_ATTENDANCE_REPORTS = `
  SELECT
    ar.id,
    ar.student_id,
    ar.attendance_id,
    ar.reported_by,
    ar.report_type,
    ar.description,
    ar.status,
    ar.report_date,
    ar.action_taken,
    ar.created_at,
    ar.updated_at,
  FROM attendance_reports AS ar
  ORDER BY ar.id DESC
`;

// READ - Get record by ID
const FIND_ATTENDANCE_REPORTS__BY_ID = `
  SELECT
    ar.id,
    ar.student_id,
    ar.attendance_id,
    ar.reported_by,
    ar.report_type,
    ar.description,
    ar.status,
    ar.report_date,
    ar.action_taken,
    ar.created_at,
    ar.updated_at,
  FROM attendance_reports AS ar
  WHERE ar.id = ?
`;

// UPDATE
const UPDATE_ATTENDANCE_REPORTS = `
  UPDATE attendance_reports AS ar
  SET
    ar.student_id = ?,
    ar.attendance_id = ?,
    ar.reported_by = ?,
    ar.report_type = ?,
    ar.description = ?,
    ar.status = ?,
    ar.report_date = ?,
    ar.action_taken = ?,
  WHERE ar.id = ?
`;

// DELETE
const DELETE_ATTENDANCE_REPORTS = `
  DELETE FROM attendance_reports
  WHERE id = ?
`;

module.exports = {
  CREATE_ATTENDANCE_REPORTS,
  FIND_ALL_ATTENDANCE_REPORTS,
  FIND_ATTENDANCE_REPORTS_BY_ID,
  UPDATE_ATTENDANCE_REPORTS,
  DELETE_ATTENDANCE_REPORTS,
};
