//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const libraryComputerUsagesService = require("../../../src/services/library_computer_usages-service.js");

const {
  CREATE_LIBRARY_COMPUTER_USAGES,
  FIND_ALL_LIBRARY_COMPUTER_USAGES,
  FIND_LIBRARY_COMPUTER_USAGES_BY_ID,
  UPDATE_LIBRARY_COMPUTER_USAGES,
  DELETE_LIBRARY_COMPUTER_USAGES,
} = require("../../../src/database/queries/library_computer_usages-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createLibraryComputerUsage", () => {
  it("should create a library computer usage successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await libraryComputerUsagesService.createLibraryComputerUsage(
      1,
      2,
      "2026-09-25",
      "08:00:00",
      "09:30:00",
      "Research",
    );

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_LIBRARY_COMPUTER_USAGES, [
      1,
      2,
      "2026-09-25",
      "08:00:00",
      "09:30:00",
      "Research",
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when student ID is missing", async () => {
    await expect(
      libraryComputerUsagesService.createLibraryComputerUsage(
        null,
        2,
        "2026-09-25",
        "08:00:00",
        "09:30:00",
        "Research",
      ),
    ).rejects.toThrow("Student ID, computer ID, usage date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when computer ID is missing", async () => {
    await expect(
      libraryComputerUsagesService.createLibraryComputerUsage(
        1,
        null,
        "2026-09-25",
        "08:00:00",
        "09:30:00",
        "Research",
      ),
    ).rejects.toThrow("Student ID, computer ID, usage date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when usage date is missing", async () => {
    await expect(
      libraryComputerUsagesService.createLibraryComputerUsage(1, 2, null, "08:00:00", "09:30:00", "Research"),
    ).rejects.toThrow("Student ID, computer ID, usage date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when time in is missing", async () => {
    await expect(
      libraryComputerUsagesService.createLibraryComputerUsage(1, 2, "2026-09-25", null, "09:30:00", "Research"),
    ).rejects.toThrow("Student ID, computer ID, usage date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllLibraryComputerUsages", () => {
  it("should return all library computer usages", async () => {
    const mockRows = [
      {
        library_computer_usage_id: 1,
        student_id: 1,
        computer_id: 2,
        usage_date: "2026-09-25",
        time_in: "08:00:00",
        time_out: "09:30:00",
        purpose: "Research",
      },
      {
        library_computer_usage_id: 2,
        student_id: 2,
        computer_id: 3,
        usage_date: "2026-09-25",
        time_in: "10:00:00",
        time_out: "11:00:00",
        purpose: "Assignment",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await libraryComputerUsagesService.findAllLibraryComputerUsages();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_LIBRARY_COMPUTER_USAGES);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no library computer usages exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await libraryComputerUsagesService.findAllLibraryComputerUsages();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_LIBRARY_COMPUTER_USAGES);

    expect(result).toEqual([]);
  });
});

describe("findLibraryComputerUsageById", () => {
  it("should return a library computer usage by ID", async () => {
    const mockUsage = {
      library_computer_usage_id: 1,
      student_id: 1,
      computer_id: 2,
      usage_date: "2026-09-25",
      time_in: "08:00:00",
      time_out: "09:30:00",
      purpose: "Research",
    };

    mockDb.query.mockResolvedValueOnce([[mockUsage]]);

    const result = await libraryComputerUsagesService.findLibraryComputerUsageById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_LIBRARY_COMPUTER_USAGES_BY_ID, [1]);

    expect(result).toEqual(mockUsage);
  });

  it("should return null when the library computer usage does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await libraryComputerUsagesService.findLibraryComputerUsageById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_LIBRARY_COMPUTER_USAGES_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(libraryComputerUsagesService.findLibraryComputerUsageById()).rejects.toThrow(
      "Library Computer Usage ID is required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("updateLibraryComputerUsage", () => {
  it("should update a library computer usage successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await libraryComputerUsagesService.updateLibraryComputerUsage(
      1,
      1,
      2,
      "2026-09-25",
      "08:00:00",
      "10:00:00",
      "Updated research",
    );

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_LIBRARY_COMPUTER_USAGES, [
      1,
      2,
      "2026-09-25",
      "08:00:00",
      "10:00:00",
      "Updated research",
      1,
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(
      libraryComputerUsagesService.updateLibraryComputerUsage(
        null,
        1,
        2,
        "2026-09-25",
        "08:00:00",
        "10:00:00",
        "Research",
      ),
    ).rejects.toThrow("Library Computer Usage ID, student ID, computer ID, usage date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when student ID is missing", async () => {
    await expect(
      libraryComputerUsagesService.updateLibraryComputerUsage(
        1,
        null,
        2,
        "2026-09-25",
        "08:00:00",
        "10:00:00",
        "Research",
      ),
    ).rejects.toThrow("Library Computer Usage ID, student ID, computer ID, usage date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when computer ID is missing", async () => {
    await expect(
      libraryComputerUsagesService.updateLibraryComputerUsage(
        1,
        1,
        null,
        "2026-09-25",
        "08:00:00",
        "10:00:00",
        "Research",
      ),
    ).rejects.toThrow("Library Computer Usage ID, student ID, computer ID, usage date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when usage date is missing", async () => {
    await expect(
      libraryComputerUsagesService.updateLibraryComputerUsage(1, 1, 2, null, "08:00:00", "10:00:00", "Research"),
    ).rejects.toThrow("Library Computer Usage ID, student ID, computer ID, usage date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when time in is missing", async () => {
    await expect(
      libraryComputerUsagesService.updateLibraryComputerUsage(1, 1, 2, "2026-09-25", null, "10:00:00", "Research"),
    ).rejects.toThrow("Library Computer Usage ID, student ID, computer ID, usage date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteLibraryComputerUsage", () => {
  it("should delete a library computer usage successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await libraryComputerUsagesService.deleteLibraryComputerUsage(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_LIBRARY_COMPUTER_USAGES, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(libraryComputerUsagesService.deleteLibraryComputerUsage()).rejects.toThrow(
      "Library Computer Usage ID is required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no usage was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await libraryComputerUsagesService.deleteLibraryComputerUsage(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_LIBRARY_COMPUTER_USAGES, [999]);

    expect(result).toEqual(mockResult);
  });
});
