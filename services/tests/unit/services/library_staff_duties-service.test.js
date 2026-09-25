//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const libraryStaffDutiesService = require("../../../src/services/library_staff_duties-service.js");

const {
  CREATE_LIBRARY_STAFF_DUTIES,
  FIND_ALL_LIBRARY_STAFF_DUTIES,
  FIND_LIBRARY_STAFF_DUTIES_BY_ID,
  UPDATE_LIBRARY_STAFF_DUTIES,
  DELETE_LIBRARY_STAFF_DUTIES,
} = require("../../../src/database/queries/library_staff_duties-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createLibraryStaffDuty", () => {
  it("should create a library staff duty successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await libraryStaffDutiesService.createLibraryStaffDuty(
      1,
      "2026-09-25",
      "08:00:00",
      "12:00:00",
      "Morning duty",
    );

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_LIBRARY_STAFF_DUTIES, [
      1,
      "2026-09-25",
      "08:00:00",
      "12:00:00",
      "Morning duty",
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when staff ID is missing", async () => {
    await expect(
      libraryStaffDutiesService.createLibraryStaffDuty(null, "2026-09-25", "08:00:00", "12:00:00", "Morning duty"),
    ).rejects.toThrow("Staff ID, duty date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when duty date is missing", async () => {
    await expect(
      libraryStaffDutiesService.createLibraryStaffDuty(1, null, "08:00:00", "12:00:00", "Morning duty"),
    ).rejects.toThrow("Staff ID, duty date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when time in is missing", async () => {
    await expect(
      libraryStaffDutiesService.createLibraryStaffDuty(1, "2026-09-25", null, "12:00:00", "Morning duty"),
    ).rejects.toThrow("Staff ID, duty date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllLibraryStaffDuties", () => {
  it("should return all library staff duties", async () => {
    const mockRows = [
      {
        library_staff_duty_id: 1,
        staff_id: 1,
        duty_date: "2026-09-25",
        time_in: "08:00:00",
        time_out: "12:00:00",
        remarks: "Morning duty",
      },
      {
        library_staff_duty_id: 2,
        staff_id: 2,
        duty_date: "2026-09-25",
        time_in: "13:00:00",
        time_out: "17:00:00",
        remarks: "Afternoon duty",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await libraryStaffDutiesService.findAllLibraryStaffDuties();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_LIBRARY_STAFF_DUTIES);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no library staff duties exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await libraryStaffDutiesService.findAllLibraryStaffDuties();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_LIBRARY_STAFF_DUTIES);

    expect(result).toEqual([]);
  });
});

describe("findLibraryStaffDutyById", () => {
  it("should return a library staff duty by ID", async () => {
    const mockDuty = {
      library_staff_duty_id: 1,
      staff_id: 1,
      duty_date: "2026-09-25",
      time_in: "08:00:00",
      time_out: "12:00:00",
      remarks: "Morning duty",
    };

    mockDb.query.mockResolvedValueOnce([[mockDuty]]);

    const result = await libraryStaffDutiesService.findLibraryStaffDutyById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_LIBRARY_STAFF_DUTIES_BY_ID, [1]);

    expect(result).toEqual(mockDuty);
  });

  it("should return null when the library staff duty does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await libraryStaffDutiesService.findLibraryStaffDutyById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_LIBRARY_STAFF_DUTIES_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(libraryStaffDutiesService.findLibraryStaffDutyById()).rejects.toThrow(
      "Library Staff Duty ID is required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("updateLibraryStaffDuty", () => {
  it("should update a library staff duty successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await libraryStaffDutiesService.updateLibraryStaffDuty(
      1,
      1,
      "2026-09-25",
      "08:00:00",
      "13:00:00",
      "Updated morning duty",
    );

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_LIBRARY_STAFF_DUTIES, [
      1,
      "2026-09-25",
      "08:00:00",
      "13:00:00",
      "Updated morning duty",
      1,
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(
      libraryStaffDutiesService.updateLibraryStaffDuty(null, 1, "2026-09-25", "08:00:00", "12:00:00", "Morning duty"),
    ).rejects.toThrow("Library Staff Duty ID, staff ID, duty date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when staff ID is missing", async () => {
    await expect(
      libraryStaffDutiesService.updateLibraryStaffDuty(1, null, "2026-09-25", "08:00:00", "12:00:00", "Morning duty"),
    ).rejects.toThrow("Library Staff Duty ID, staff ID, duty date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when duty date is missing", async () => {
    await expect(
      libraryStaffDutiesService.updateLibraryStaffDuty(1, 1, null, "08:00:00", "12:00:00", "Morning duty"),
    ).rejects.toThrow("Library Staff Duty ID, staff ID, duty date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when time in is missing", async () => {
    await expect(
      libraryStaffDutiesService.updateLibraryStaffDuty(1, 1, "2026-09-25", null, "12:00:00", "Morning duty"),
    ).rejects.toThrow("Library Staff Duty ID, staff ID, duty date, and time in are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteLibraryStaffDuty", () => {
  it("should delete a library staff duty successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await libraryStaffDutiesService.deleteLibraryStaffDuty(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_LIBRARY_STAFF_DUTIES, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(libraryStaffDutiesService.deleteLibraryStaffDuty()).rejects.toThrow(
      "Library Staff Duty ID is required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no duty was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await libraryStaffDutiesService.deleteLibraryStaffDuty(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_LIBRARY_STAFF_DUTIES, [999]);

    expect(result).toEqual(mockResult);
  });
});
