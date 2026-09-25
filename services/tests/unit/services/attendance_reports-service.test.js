//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const attendanceReportsService = require("../../../src/services/attendance_reports-service.js");

const {
  CREATE_ATTENDANCE_REPORTS,
  FIND_ALL_ATTENDANCE_REPORTS,
  FIND_ATTENDANCE_REPORTS_BY_ID,
  UPDATE_ATTENDANCE_REPORTS,
  DELETE_ATTENDANCE_REPORTS,
} = require("../../../src/database/queries/attendance_reports-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createAttendanceReport", () => {
  it("should create an attendance report successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await attendanceReportsService.createAttendanceReport(
      10,
      20,
      5,
      "Late Arrival",
      "Student arrived late.",
      "Pending",
      "2026-09-25",
      "Verbal warning",
    );

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_ATTENDANCE_REPORTS, [
      10,
      20,
      5,
      "Late Arrival",
      "Student arrived late.",
      "Pending",
      "2026-09-25",
      "Verbal warning",
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when required fields are missing", async () => {
    await expect(
      attendanceReportsService.createAttendanceReport(
        null,
        20,
        5,
        "Late Arrival",
        "Student arrived late.",
        "Pending",
        "2026-09-25",
        "Verbal warning",
      ),
    ).rejects.toThrow("Student ID, attendance ID, reported by, and report type are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllAttendanceReports", () => {
  it("should return all attendance reports", async () => {
    const mockRows = [
      {
        id: 1,
        student_id: 10,
        attendance_id: 20,
        reported_by: 5,
        report_type: "Late Arrival",
        description: "Student arrived late.",
        status: "Pending",
        report_date: "2026-09-25",
        action_taken: "Verbal warning",
      },
      {
        id: 2,
        student_id: 11,
        attendance_id: 21,
        reported_by: 6,
        report_type: "Early Departure",
        description: "Student left early.",
        status: "Resolved",
        report_date: "2026-09-24",
        action_taken: "Parent notified",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await attendanceReportsService.findAllAttendanceReports();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_ATTENDANCE_REPORTS);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no reports exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await attendanceReportsService.findAllAttendanceReports();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_ATTENDANCE_REPORTS);

    expect(result).toEqual([]);
  });
});

describe("findAttendanceReportById", () => {
  it("should return an attendance report by ID", async () => {
    const mockReport = {
      id: 1,
      student_id: 10,
      attendance_id: 20,
      reported_by: 5,
      report_type: "Late Arrival",
      description: "Student arrived late.",
      status: "Pending",
      report_date: "2026-09-25",
      action_taken: "Verbal warning",
    };

    mockDb.query.mockResolvedValueOnce([[mockReport]]);

    const result = await attendanceReportsService.findAttendanceReportById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ATTENDANCE_REPORTS_BY_ID, [1]);

    expect(result).toEqual(mockReport);
  });

  it("should return null when the attendance report does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await attendanceReportsService.findAttendanceReportById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ATTENDANCE_REPORTS_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(attendanceReportsService.findAttendanceReportById()).rejects.toThrow(
      "Attendance Report ID is required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("updateAttendanceReport", () => {
  it("should update an attendance report successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await attendanceReportsService.updateAttendanceReport(
      1,
      10,
      20,
      5,
      "Late Arrival",
      "Updated description",
      "Resolved",
      "2026-09-25",
      "Parent notified",
    );

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_ATTENDANCE_REPORTS, [
      10,
      20,
      5,
      "Late Arrival",
      "Updated description",
      "Resolved",
      "2026-09-25",
      "Parent notified",
      1,
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when required fields are missing", async () => {
    await expect(
      attendanceReportsService.updateAttendanceReport(
        null,
        10,
        20,
        5,
        "Late Arrival",
        "Updated description",
        "Resolved",
        "2026-09-25",
        "Parent notified",
      ),
    ).rejects.toThrow("Attendance Report ID, student ID, attendance ID, reported by, and report type are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteAttendanceReport", () => {
  it("should delete an attendance report successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await attendanceReportsService.deleteAttendanceReport(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_ATTENDANCE_REPORTS, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when attendance report ID is missing", async () => {
    await expect(attendanceReportsService.deleteAttendanceReport()).rejects.toThrow(
      "Attendance Report ID is required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no report was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await attendanceReportsService.deleteAttendanceReport(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_ATTENDANCE_REPORTS, [999]);

    expect(result).toEqual(mockResult);
  });
});
