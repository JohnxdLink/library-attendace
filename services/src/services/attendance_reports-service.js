const db = require("../config/database.js");
const {
  CREATE_ATTENDANCE_REPORTS,
  FIND_ALL_ATTENDANCE_REPORTS,
  FIND_ATTENDANCE_REPORTS_BY_ID,
  UPDATE_ATTENDANCE_REPORTS,
  DELETE_ATTENDANCE_REPORTS,
} = require("../database/queries/attendance_reports-query.js");

// CREATE
const createAttendanceReport = async (
  student_id,
  attendance_id,
  reported_by,
  report_type,
  description,
  status,
  report_date,
  action_taken,
) => {
  if (!student_id || !attendance_id || !reported_by || !report_type) {
    throw new Error("Student ID, attendance ID, reported by, and report type are required.");
  }

  const [result] = await db.query(CREATE_ATTENDANCE_REPORTS, [
    student_id,
    attendance_id,
    reported_by,
    report_type,
    description,
    status,
    report_date,
    action_taken,
  ]);

  return result;
};

// READ - Get all attendance reports
const findAllAttendanceReports = async () => {
  const [rows] = await db.query(FIND_ALL_ATTENDANCE_REPORTS);

  return rows;
};

// READ - Get attendance report by ID
const findAttendanceReportById = async (id) => {
  if (!id) {
    throw new Error("Attendance Report ID is required.");
  }

  const [rows] = await db.query(FIND_ATTENDANCE_REPORTS_BY_ID, [id]);

  return rows[0] || null;
};

// UPDATE
const updateAttendanceReport = async (
  id,
  student_id,
  attendance_id,
  reported_by,
  report_type,
  description,
  status,
  report_date,
  action_taken,
) => {
  if (!id || !student_id || !attendance_id || !reported_by || !report_type) {
    throw new Error("Attendance Report ID, student ID, attendance ID, reported by, and report type are required.");
  }

  const [result] = await db.query(UPDATE_ATTENDANCE_REPORTS, [
    student_id,
    attendance_id,
    reported_by,
    report_type,
    description,
    status,
    report_date,
    action_taken,
    id,
  ]);

  return result;
};

// DELETE
const deleteAttendanceReport = async (attendance_report_id) => {
  if (!attendance_report_id) {
    throw new Error("Attendance Report ID is required.");
  }

  const [result] = await db.query(DELETE_ATTENDANCE_REPORTS, [attendance_report_id]);

  return result;
};

module.exports = {
  createAttendanceReport,
  findAllAttendanceReports,
  findAttendanceReportById,
  updateAttendanceReport,
  deleteAttendanceReport,
};
