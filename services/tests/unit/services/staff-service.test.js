//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const staffService = require("../../../src/services/staff-service.js");

const {
  CREATE_STAFF,
  FIND_ALL_STAFFS,
  FIND_STAFF_BY_ID,
  FIND_STAFF_BY_ACCOUNT_ID,
  FIND_STAFF_BY_EMAIL,
  UPDATE_STAFF,
  DELETE_STAFF,
} = require("../../../src/database/queries/staff-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createStaff", () => {
  it("should create a staff successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await staffService.createStaff(10, 2, "Doe", "John", "09171234567", "john.doe@example.com");

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_STAFF, [
      10,
      2,
      "Doe",
      "John",
      "09171234567",
      "john.doe@example.com",
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when role ID is missing", async () => {
    await expect(
      staffService.createStaff(10, null, "Doe", "John", "09171234567", "john.doe@example.com"),
    ).rejects.toThrow("All staff fields are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when lastname is missing", async () => {
    await expect(staffService.createStaff(10, 2, null, "John", "09171234567", "john.doe@example.com")).rejects.toThrow(
      "All staff fields are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when firstname is missing", async () => {
    await expect(staffService.createStaff(10, 2, "Doe", null, "09171234567", "john.doe@example.com")).rejects.toThrow(
      "All staff fields are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllStaffs", () => {
  it("should return all staffs", async () => {
    const mockRows = [
      {
        staff_id: 1,
        account_id: 10,
        role_id: 2,
        lastname: "Doe",
        firstname: "John",
        contact_no: "09171234567",
        email: "john.doe@example.com",
      },
      {
        staff_id: 2,
        account_id: 11,
        role_id: 3,
        lastname: "Smith",
        firstname: "Jane",
        contact_no: "09181234567",
        email: "jane.smith@example.com",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await staffService.findAllStaffs();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_STAFFS);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no staffs exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await staffService.findAllStaffs();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_STAFFS);

    expect(result).toEqual([]);
  });
});

describe("findStaffById", () => {
  it("should return a staff by ID", async () => {
    const mockStaff = {
      staff_id: 1,
      account_id: 10,
      role_id: 2,
      lastname: "Doe",
      firstname: "John",
      contact_no: "09171234567",
      email: "john.doe@example.com",
    };

    mockDb.query.mockResolvedValueOnce([[mockStaff]]);

    const result = await staffService.findStaffById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_STAFF_BY_ID, [1]);

    expect(result).toEqual(mockStaff);
  });

  it("should return null when the staff does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await staffService.findStaffById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_STAFF_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(staffService.findStaffById()).rejects.toThrow("Staff ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findStaffByAccountId", () => {
  it("should return a staff by account ID", async () => {
    const mockStaff = {
      staff_id: 1,
      account_id: 10,
      role_id: 2,
      lastname: "Doe",
      firstname: "John",
      contact_no: "09171234567",
      email: "john.doe@example.com",
    };

    mockDb.query.mockResolvedValueOnce([[mockStaff]]);

    const result = await staffService.findStaffByAccountId(10);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_STAFF_BY_ACCOUNT_ID, [10]);

    expect(result).toEqual(mockStaff);
  });

  it("should return null when no staff exists for the account ID", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await staffService.findStaffByAccountId(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_STAFF_BY_ACCOUNT_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when account ID is missing", async () => {
    await expect(staffService.findStaffByAccountId()).rejects.toThrow("Account ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findStaffByEmail", () => {
  it("should return a staff by email", async () => {
    const mockStaff = {
      staff_id: 1,
      account_id: 10,
      role_id: 2,
      lastname: "Doe",
      firstname: "John",
      contact_no: "09171234567",
      email: "john.doe@example.com",
    };

    mockDb.query.mockResolvedValueOnce([[mockStaff]]);

    const result = await staffService.findStaffByEmail("john.doe@example.com");

    expect(mockDb.query).toHaveBeenCalledWith(FIND_STAFF_BY_EMAIL, ["john.doe@example.com"]);

    expect(result).toEqual(mockStaff);
  });

  it("should return null when no staff exists for the email", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await staffService.findStaffByEmail("unknown@example.com");

    expect(mockDb.query).toHaveBeenCalledWith(FIND_STAFF_BY_EMAIL, ["unknown@example.com"]);

    expect(result).toBeNull();
  });

  it("should throw an error when email is missing", async () => {
    await expect(staffService.findStaffByEmail()).rejects.toThrow("Email is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("updateStaff", () => {
  it("should update a staff successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await staffService.updateStaff(1, 10, 2, "Doe", "John", "09171234567", "john.doe@example.com");

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_STAFF, [
      10,
      2,
      "Doe",
      "John",
      "09171234567",
      "john.doe@example.com",
      1,
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(
      staffService.updateStaff(null, 10, 2, "Doe", "John", "09171234567", "john.doe@example.com"),
    ).rejects.toThrow("All staff fields are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when account ID is missing", async () => {
    await expect(
      staffService.updateStaff(1, null, 2, "Doe", "John", "09171234567", "john.doe@example.com"),
    ).rejects.toThrow("All staff fields are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when role ID is missing", async () => {
    await expect(
      staffService.updateStaff(1, 10, null, "Doe", "John", "09171234567", "john.doe@example.com"),
    ).rejects.toThrow("All staff fields are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when lastname is missing", async () => {
    await expect(
      staffService.updateStaff(1, 10, 2, null, "John", "09171234567", "john.doe@example.com"),
    ).rejects.toThrow("All staff fields are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when firstname is missing", async () => {
    await expect(
      staffService.updateStaff(1, 10, 2, "Doe", null, "09171234567", "john.doe@example.com"),
    ).rejects.toThrow("All staff fields are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when contact number is missing", async () => {
    await expect(staffService.updateStaff(1, 10, 2, "Doe", "John", null, "john.doe@example.com")).rejects.toThrow(
      "All staff fields are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when email is missing", async () => {
    await expect(staffService.updateStaff(1, 10, 2, "Doe", "John", "09171234567", null)).rejects.toThrow(
      "All staff fields are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteStaff", () => {
  it("should delete a staff successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await staffService.deleteStaff(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_STAFF, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(staffService.deleteStaff()).rejects.toThrow("Staff ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no staff was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await staffService.deleteStaff(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_STAFF, [999]);

    expect(result).toEqual(mockResult);
  });
});
