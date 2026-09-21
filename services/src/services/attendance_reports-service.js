const db = require("../config/database.js");
const {
  CREATE_ATTENDANCE_REPORTS,
  FIND_ALL_ATTENDANCE_REPORTS,
  FIND_ATTENDANCE_REPORTS_BY_ID,
  UPDATE_ATTENDANCE_REPORTS,
  DELETE_ATTENDANCE_REPORTS,
} = require("../database/queries/attendance_reports-query.js");

// CREATE
const createAttendanceReports = async(
  student_id,
  attendance_id,
  reported_by,
  report_type,
  description,
  status,
  report_date,
  action_taken,
);
