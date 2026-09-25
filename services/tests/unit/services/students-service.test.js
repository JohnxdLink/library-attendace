//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const studentsService = require("../../../src/services/students-service.js");

const {
  CREATE_STUDENT,
  FIND_ALL_STUDENTS,
  FIND_STUDENT_BY_ID,
  UPDATE_STUDENT,
  DELETE_STUDENT,
} = require("../../../src/database/queries/students-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createStudent", () => {
  it("should create a student successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await studentsService.createStudent(1, 2, "Doe", "John", "Michael", "09123456789");

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_STUDENT, [1, 2, "Doe", "John", "Michael", "09123456789"]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when grade section ID is missing", async () => {
    await expect(studentsService.createStudent(null, 2, "Doe", "John", "Michael", "09123456789")).rejects.toThrow(
      "Grade section id, account id, and contact no are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when account ID is missing", async () => {
    await expect(studentsService.createStudent(1, null, "Doe", "John", "Michael", "09123456789")).rejects.toThrow(
      "Grade section id, account id, and contact no are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when contact number is missing", async () => {
    await expect(studentsService.createStudent(1, 2, "Doe", "John", "Michael", null)).rejects.toThrow(
      "Grade section id, account id, and contact no are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllStudents", () => {
  it("should return all students", async () => {
    const mockRows = [
      {
        student_id: 1,
        grade_section_id: 1,
        account_id: 2,
        lastname: "Doe",
        firstname: "John",
        middlename: "Michael",
        contact_no: "09123456789",
      },
      {
        student_id: 2,
        grade_section_id: 2,
        account_id: 3,
        lastname: "Smith",
        firstname: "Jane",
        middlename: "Marie",
        contact_no: "09987654321",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await studentsService.findAllStudents();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_STUDENTS);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no students exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await studentsService.findAllStudents();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_STUDENTS);

    expect(result).toEqual([]);
  });
});

describe("findStudentById", () => {
  it("should return a student by ID", async () => {
    const mockStudent = {
      student_id: 1,
      grade_section_id: 1,
      account_id: 2,
      lastname: "Doe",
      firstname: "John",
      middlename: "Michael",
      contact_no: "09123456789",
    };

    mockDb.query.mockResolvedValueOnce([[mockStudent]]);

    const result = await studentsService.findStudentById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_STUDENT_BY_ID, [1]);

    expect(result).toEqual(mockStudent);
  });

  it("should return null when the student does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await studentsService.findStudentById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_STUDENT_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(studentsService.findStudentById()).rejects.toThrow("Students ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("updateStudent", () => {
  it("should update a student successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await studentsService.updateStudent(1, 1, 2, "Doe", "John", "Michael", "09123456789");

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_STUDENT, [1, 2, "Doe", "John", "Michael", "09123456789", 1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(studentsService.updateStudent(null, 1, 2, "Doe", "John", "Michael", "09123456789")).rejects.toThrow(
      "Students ID, grade section ID, account ID, and contact no are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when grade section ID is missing", async () => {
    await expect(studentsService.updateStudent(1, null, 2, "Doe", "John", "Michael", "09123456789")).rejects.toThrow(
      "Students ID, grade section ID, account ID, and contact no are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when account ID is missing", async () => {
    await expect(studentsService.updateStudent(1, 1, null, "Doe", "John", "Michael", "09123456789")).rejects.toThrow(
      "Students ID, grade section ID, account ID, and contact no are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteStudent", () => {
  it("should delete a student successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await studentsService.deleteStudent(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_STUDENT, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(studentsService.deleteStudent()).rejects.toThrow("Students ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no student was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await studentsService.deleteStudent(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_STUDENT, [999]);

    expect(result).toEqual(mockResult);
  });
});
