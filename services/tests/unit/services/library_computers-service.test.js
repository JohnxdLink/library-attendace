//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const libraryComputerService = require("../../../src/services/library_computers-service.js");

const {
  CREATE_LIBRARY_COMPUTER,
  FIND_ALL_LIBRARY_COMPUTER,
  FIND_LIBRARY_COMPUTER_BY_ID,
  UPDATE_LIBRARY_COMPUTER,
  DELETE_LIBRARY_COMPUTER,
} = require("../../../src/database/queries/library_computers-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createLibraryComputer", () => {
  it("should create a library computer successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await libraryComputerService.createLibraryComputer("PC-001", "Available");

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_LIBRARY_COMPUTER, ["PC-001", "Available"]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when computer number is missing", async () => {
    await expect(libraryComputerService.createLibraryComputer(null, "Available")).rejects.toThrow(
      "Computer number and status are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when status is missing", async () => {
    await expect(libraryComputerService.createLibraryComputer("PC-001", null)).rejects.toThrow(
      "Computer number and status are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllLibraryComputers", () => {
  it("should return all library computers", async () => {
    const mockRows = [
      {
        library_computer_id: 1,
        computer_number: "PC-001",
        status: "Available",
      },
      {
        library_computer_id: 2,
        computer_number: "PC-002",
        status: "In Use",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await libraryComputerService.findAllLibraryComputers();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_LIBRARY_COMPUTER);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no library computers exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await libraryComputerService.findAllLibraryComputers();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_LIBRARY_COMPUTER);

    expect(result).toEqual([]);
  });
});

describe("findLibraryComputerById", () => {
  it("should return a library computer by ID", async () => {
    const mockComputer = {
      library_computer_id: 1,
      computer_number: "PC-001",
      status: "Available",
    };

    mockDb.query.mockResolvedValueOnce([[mockComputer]]);

    const result = await libraryComputerService.findLibraryComputerById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_LIBRARY_COMPUTER_BY_ID, [1]);

    expect(result).toEqual(mockComputer);
  });

  it("should return null when the library computer does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await libraryComputerService.findLibraryComputerById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_LIBRARY_COMPUTER_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(libraryComputerService.findLibraryComputerById()).rejects.toThrow("Library Computer ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("updateLibraryComputer", () => {
  it("should update a library computer successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await libraryComputerService.updateLibraryComputer(1, "PC-001", "In Use");

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_LIBRARY_COMPUTER, ["PC-001", "In Use", 1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(libraryComputerService.updateLibraryComputer(null, "PC-001", "Available")).rejects.toThrow(
      "Library Computer ID, computer number, and status are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when computer number is missing", async () => {
    await expect(libraryComputerService.updateLibraryComputer(1, null, "Available")).rejects.toThrow(
      "Library Computer ID, computer number, and status are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when status is missing", async () => {
    await expect(libraryComputerService.updateLibraryComputer(1, "PC-001", null)).rejects.toThrow(
      "Library Computer ID, computer number, and status are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteLibraryComputer", () => {
  it("should delete a library computer successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await libraryComputerService.deleteLibraryComputer(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_LIBRARY_COMPUTER, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(libraryComputerService.deleteLibraryComputer()).rejects.toThrow("Library Computer ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no computer was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await libraryComputerService.deleteLibraryComputer(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_LIBRARY_COMPUTER, [999]);

    expect(result).toEqual(mockResult);
  });
});
