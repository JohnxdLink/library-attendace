const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const attendanceReportsService = require("../services/attendance-reports-service.js");

// CREATE
const createAttendanceReport = async (req, res) => {
  try {
    const { student_id, attendance_id, reported_by, report_type, description, status, report_date, action_taken } =
      req.body;

    const result = await attendanceReportsService.createAttendanceReport(
      student_id,
      attendance_id,
      reported_by,
      report_type,
      description,
      status,
      report_date,
      action_taken,
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Attendance report created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Attendance report creation error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get all attendance reports
const findAllAttendanceReports = async (req, res) => {
  try {
    const result = await attendanceReportsService.findAllAttendanceReports();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Attendance reports retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find all attendance reports error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get attendance report by ID
const findAttendanceReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await attendanceReportsService.findAttendanceReportById(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Attendance report not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Attendance report retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find attendance report by ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// UPDATE
const updateAttendanceReport = async (req, res) => {
  try {
    const { id } = req.params;

    const { student_id, attendance_id, reported_by, report_type, description, status, report_date, action_taken } =
      req.body;

    const result = await attendanceReportsService.updateAttendanceReport(
      id,
      student_id,
      attendance_id,
      reported_by,
      report_type,
      description,
      status,
      report_date,
      action_taken,
    );

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Attendance report not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Attendance report updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Attendance report update error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// DELETE
const deleteAttendanceReport = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await attendanceReportsService.deleteAttendanceReport(id);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Attendance report not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Attendance report deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Attendance report delete error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  createAttendanceReport,
  findAllAttendanceReports,
  findAttendanceReportById,
  updateAttendanceReport,
  deleteAttendanceReport,
};
