//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const schoolYearsService = require("../../../src/services/school-years-service.js");

const {
  CREATE_SCHOOL_YEAR,
  FIND_ALL_SCHOOL_YEARS,
  FIND_SCHOOL_YEAR_BY_ID,
  FIND_SCHOOL_YEAR_BY_YEAR,
  FIND_ACTIVE_SCHOOL_YEAR,
  UPDATE_SCHOOL_YEAR,
  DELETE_SCHOOL_YEAR,
} = require("../../../src/database/queries/school_years-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createSchoolYear", () => {
  it("should create a school year successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await schoolYearsService.createSchoolYear(1, "2026-2027", "2026-06-01", "2027-03-31", 1);

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_SCHOOL_YEAR, [1, "2026-2027", "2026-06-01", "2027-03-31", 1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when staff ID is missing", async () => {
    await expect(schoolYearsService.createSchoolYear(null, "2026-2027", "2026-06-01", "2027-03-31", 1)).rejects.toThrow(
      "Staff ID, school year, start date, and end date are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when school year is missing", async () => {
    await expect(schoolYearsService.createSchoolYear(1, null, "2026-06-01", "2027-03-31", 1)).rejects.toThrow(
      "Staff ID, school year, start date, and end date are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when start date is missing", async () => {
    await expect(schoolYearsService.createSchoolYear(1, "2026-2027", null, "2027-03-31", 1)).rejects.toThrow(
      "Staff ID, school year, start date, and end date are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when end date is missing", async () => {
    await expect(schoolYearsService.createSchoolYear(1, "2026-2027", "2026-06-01", null, 1)).rejects.toThrow(
      "Staff ID, school year, start date, and end date are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllSchoolYears", () => {
  it("should return all school years", async () => {
    const mockRows = [
      {
        school_year_id: 1,
        staff_id: 1,
        school_year: "2026-2027",
        start_date: "2026-06-01",
        end_date: "2027-03-31",
        is_active: 1,
      },
      {
        school_year_id: 2,
        staff_id: 2,
        school_year: "2025-2026",
        start_date: "2025-06-01",
        end_date: "2026-03-31",
        is_active: 0,
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await schoolYearsService.findAllSchoolYears();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_SCHOOL_YEARS);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no school years exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await schoolYearsService.findAllSchoolYears();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_SCHOOL_YEARS);

    expect(result).toEqual([]);
  });
});

describe("findSchoolYearById", () => {
  it("should return a school year by ID", async () => {
    const mockSchoolYear = {
      school_year_id: 1,
      staff_id: 1,
      school_year: "2026-2027",
      start_date: "2026-06-01",
      end_date: "2027-03-31",
      is_active: 1,
    };

    mockDb.query.mockResolvedValueOnce([[mockSchoolYear]]);

    const result = await schoolYearsService.findSchoolYearById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_SCHOOL_YEAR_BY_ID, [1]);

    expect(result).toEqual(mockSchoolYear);
  });

  it("should return null when the school year does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await schoolYearsService.findSchoolYearById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_SCHOOL_YEAR_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(schoolYearsService.findSchoolYearById()).rejects.toThrow("ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findSchoolYearByYear", () => {
  it("should return a school year by year", async () => {
    const mockSchoolYear = {
      school_year_id: 1,
      staff_id: 1,
      school_year: "2026-2027",
      start_date: "2026-06-01",
      end_date: "2027-03-31",
      is_active: 1,
    };

    mockDb.query.mockResolvedValueOnce([[mockSchoolYear]]);

    const result = await schoolYearsService.findSchoolYearByYear("2026-2027");

    expect(mockDb.query).toHaveBeenCalledWith(FIND_SCHOOL_YEAR_BY_YEAR, ["2026-2027"]);

    expect(result).toEqual(mockSchoolYear);
  });

  it("should return null when the school year does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await schoolYearsService.findSchoolYearByYear("9999-9999");

    expect(mockDb.query).toHaveBeenCalledWith(FIND_SCHOOL_YEAR_BY_YEAR, ["9999-9999"]);

    expect(result).toBeNull();
  });

  it("should throw an error when school year is missing", async () => {
    await expect(schoolYearsService.findSchoolYearByYear()).rejects.toThrow("School year is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findActiveSchoolYear", () => {
  it("should return the active school year", async () => {
    const mockSchoolYear = {
      school_year_id: 1,
      staff_id: 1,
      school_year: "2026-2027",
      start_date: "2026-06-01",
      end_date: "2027-03-31",
      is_active: 1,
    };

    mockDb.query.mockResolvedValueOnce([[mockSchoolYear]]);

    const result = await schoolYearsService.findActiveSchoolYear();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ACTIVE_SCHOOL_YEAR);

    expect(result).toEqual(mockSchoolYear);
  });

  it("should return null when there is no active school year", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await schoolYearsService.findActiveSchoolYear();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ACTIVE_SCHOOL_YEAR);

    expect(result).toBeNull();
  });
});

describe("updateSchoolYear", () => {
  it("should update a school year successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await schoolYearsService.updateSchoolYear(1, 1, "2026-2027", "2026-06-01", "2027-03-31", 1);

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_SCHOOL_YEAR, [1, "2026-2027", "2026-06-01", "2027-03-31", 1, 1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(
      schoolYearsService.updateSchoolYear(null, 1, "2026-2027", "2026-06-01", "2027-03-31", 1),
    ).rejects.toThrow("ID, staff ID, school year, start date, and end date are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when staff ID is missing", async () => {
    await expect(
      schoolYearsService.updateSchoolYear(1, null, "2026-2027", "2026-06-01", "2027-03-31", 1),
    ).rejects.toThrow("ID, staff ID, school year, start date, and end date are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when school year is missing", async () => {
    await expect(schoolYearsService.updateSchoolYear(1, 1, null, "2026-06-01", "2027-03-31", 1)).rejects.toThrow(
      "ID, staff ID, school year, start date, and end date are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when start date is missing", async () => {
    await expect(schoolYearsService.updateSchoolYear(1, 1, "2026-2027", null, "2027-03-31", 1)).rejects.toThrow(
      "ID, staff ID, school year, start date, and end date are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when end date is missing", async () => {
    await expect(schoolYearsService.updateSchoolYear(1, 1, "2026-2027", "2026-06-01", null, 1)).rejects.toThrow(
      "ID, staff ID, school year, start date, and end date are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteSchoolYear", () => {
  it("should delete a school year successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await schoolYearsService.deleteSchoolYear(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_SCHOOL_YEAR, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(schoolYearsService.deleteSchoolYear()).rejects.toThrow("ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no school year was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await schoolYearsService.deleteSchoolYear(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_SCHOOL_YEAR, [999]);

    expect(result).toEqual(mockResult);
  });
});
