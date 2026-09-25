//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const visitorsService = require("../../../src/services/visitors-service.js");

const {
  CREATE_VISITORS,
  FIND_ALL_VISITORS,
  FIND_VISITORS_BY_ID,
  UPDATE_VISITORS,
  DELETE_VISITORS,
} = require("../../../src/database/queries/visitors-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createVisitor", () => {
  it("should create a visitor successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await visitorsService.createVisitor(
      "John Doe",
      "Parent",
      "09123456789",
      "Visit student",
      "Jane Doe",
      "08:00:00",
      "09:00:00",
      "2026-09-25",
      "No remarks",
    );

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_VISITORS, [
      "John Doe",
      "Parent",
      "09123456789",
      "Visit student",
      "Jane Doe",
      "08:00:00",
      "09:00:00",
      "2026-09-25",
      "No remarks",
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when visitor name is missing", async () => {
    await expect(
      visitorsService.createVisitor(
        null,
        "Parent",
        "09123456789",
        "Visit student",
        "Jane Doe",
        "08:00:00",
        "09:00:00",
        "2026-09-25",
        "No remarks",
      ),
    ).rejects.toThrow("Visitor name, visitor type, purpose, visit date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when visitor type is missing", async () => {
    await expect(
      visitorsService.createVisitor(
        "John Doe",
        null,
        "09123456789",
        "Visit student",
        "Jane Doe",
        "08:00:00",
        "09:00:00",
        "2026-09-25",
        "No remarks",
      ),
    ).rejects.toThrow("Visitor name, visitor type, purpose, visit date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when purpose is missing", async () => {
    await expect(
      visitorsService.createVisitor(
        "John Doe",
        "Parent",
        "09123456789",
        null,
        "Jane Doe",
        "08:00:00",
        "09:00:00",
        "2026-09-25",
        "No remarks",
      ),
    ).rejects.toThrow("Visitor name, visitor type, purpose, visit date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when visit date is missing", async () => {
    await expect(
      visitorsService.createVisitor(
        "John Doe",
        "Parent",
        "09123456789",
        "Visit student",
        "Jane Doe",
        "08:00:00",
        "09:00:00",
        null,
        "No remarks",
      ),
    ).rejects.toThrow("Visitor name, visitor type, purpose, visit date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when time in is missing", async () => {
    await expect(
      visitorsService.createVisitor(
        "John Doe",
        "Parent",
        "09123456789",
        "Visit student",
        "Jane Doe",
        null,
        "09:00:00",
        "2026-09-25",
        "No remarks",
      ),
    ).rejects.toThrow("Visitor name, visitor type, purpose, visit date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllVisitors", () => {
  it("should return all visitors", async () => {
    const mockRows = [
      {
        visitor_id: 1,
        visitor_name: "John Doe",
        visitor_type: "Parent",
        contact_no: "09123456789",
        purpose: "Visit student",
        person_to_visit: "Jane Doe",
        time_in: "08:00:00",
        time_out: "09:00:00",
        visit_date: "2026-09-25",
        remarks: "No remarks",
      },
      {
        visitor_id: 2,
        visitor_name: "Maria Santos",
        visitor_type: "Guest",
        contact_no: "09987654321",
        purpose: "Meeting",
        person_to_visit: "Staff Member",
        time_in: "10:00:00",
        time_out: "11:00:00",
        visit_date: "2026-09-25",
        remarks: null,
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await visitorsService.findAllVisitors();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_VISITORS);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no visitors exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await visitorsService.findAllVisitors();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_VISITORS);

    expect(result).toEqual([]);
  });
});

describe("findVisitorById", () => {
  it("should return a visitor by ID", async () => {
    const mockVisitor = {
      visitor_id: 1,
      visitor_name: "John Doe",
      visitor_type: "Parent",
      contact_no: "09123456789",
      purpose: "Visit student",
      person_to_visit: "Jane Doe",
      time_in: "08:00:00",
      time_out: "09:00:00",
      visit_date: "2026-09-25",
      remarks: "No remarks",
    };

    mockDb.query.mockResolvedValueOnce([[mockVisitor]]);

    const result = await visitorsService.findVisitorById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_VISITORS_BY_ID, [1]);

    expect(result).toEqual(mockVisitor);
  });

  it("should return null when the visitor does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await visitorsService.findVisitorById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_VISITORS_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(visitorsService.findVisitorById()).rejects.toThrow("Visitor ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("updateVisitor", () => {
  it("should update a visitor successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await visitorsService.updateVisitor(
      1,
      "John Doe",
      "Parent",
      "09123456789",
      "Visit student",
      "Jane Doe",
      "08:00:00",
      "09:00:00",
      "2026-09-25",
      "Updated remarks",
    );

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_VISITORS, [
      "John Doe",
      "Parent",
      "09123456789",
      "Visit student",
      "Jane Doe",
      "08:00:00",
      "09:00:00",
      "2026-09-25",
      "Updated remarks",
      1,
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(
      visitorsService.updateVisitor(
        null,
        "John Doe",
        "Parent",
        "09123456789",
        "Visit student",
        "Jane Doe",
        "08:00:00",
        "09:00:00",
        "2026-09-25",
        "No remarks",
      ),
    ).rejects.toThrow("Visitor ID, visitor name, visitor type, purpose, visit date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when visitor name is missing", async () => {
    await expect(
      visitorsService.updateVisitor(
        1,
        null,
        "Parent",
        "09123456789",
        "Visit student",
        "Jane Doe",
        "08:00:00",
        "09:00:00",
        "2026-09-25",
        "No remarks",
      ),
    ).rejects.toThrow("Visitor ID, visitor name, visitor type, purpose, visit date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when visitor type is missing", async () => {
    await expect(
      visitorsService.updateVisitor(
        1,
        "John Doe",
        null,
        "09123456789",
        "Visit student",
        "Jane Doe",
        "08:00:00",
        "09:00:00",
        "2026-09-25",
        "No remarks",
      ),
    ).rejects.toThrow("Visitor ID, visitor name, visitor type, purpose, visit date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when purpose is missing", async () => {
    await expect(
      visitorsService.updateVisitor(
        1,
        "John Doe",
        "Parent",
        "09123456789",
        null,
        "Jane Doe",
        "08:00:00",
        "09:00:00",
        "2026-09-25",
        "No remarks",
      ),
    ).rejects.toThrow("Visitor ID, visitor name, visitor type, purpose, visit date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when visit date is missing", async () => {
    await expect(
      visitorsService.updateVisitor(
        1,
        "John Doe",
        "Parent",
        "09123456789",
        "Visit student",
        "Jane Doe",
        "08:00:00",
        "09:00:00",
        null,
        "No remarks",
      ),
    ).rejects.toThrow("Visitor ID, visitor name, visitor type, purpose, visit date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when time in is missing", async () => {
    await expect(
      visitorsService.updateVisitor(
        1,
        "John Doe",
        "Parent",
        "09123456789",
        "Visit student",
        "Jane Doe",
        null,
        "09:00:00",
        "2026-09-25",
        "No remarks",
      ),
    ).rejects.toThrow("Visitor ID, visitor name, visitor type, purpose, visit date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteVisitor", () => {
  it("should delete a visitor successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await visitorsService.deleteVisitor(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_VISITORS, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(visitorsService.deleteVisitor()).rejects.toThrow("Visitor ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no visitor was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await visitorsService.deleteVisitor(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_VISITORS, [999]);

    expect(result).toEqual(mockResult);
  });
});
