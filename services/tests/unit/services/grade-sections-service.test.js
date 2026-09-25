//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const gradeSectionsService = require("../../../src/services/grade-sections-service.js");

const {
  CREATE_GRADE_SECTION,
  FIND_ALL_GRADE_SECTIONS,
  FIND_GRADE_SECTION_BY_ID,
  FIND_GRADE_SECTIONS_BY_SCHOOL_YEAR,
  FIND_GRADE_SECTIONS_BY_GRADE_N_STRAND,
  FIND_GRADE_SECTIONS_BY_ADVISER,
  FIND_GRADE_SECTION,
  UPDATE_GRADE_SECTION,
  DELETE_GRADE_SECTION,
} = require("../../../src/database/queries/grade_sections-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createGradeSection", () => {
  it("should create a grade section successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await gradeSectionsService.createGradeSection(
      1,
      2,
      3,
      "11-STEM-A",
      "Science, Technology, Engineering, and Mathematics",
    );

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_GRADE_SECTION, [
      1,
      2,
      3,
      "11-STEM-A",
      "Science, Technology, Engineering, and Mathematics",
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when school year ID is missing", async () => {
    await expect(gradeSectionsService.createGradeSection(null, 2, 3, "11-STEM-A", "Science section")).rejects.toThrow(
      "School year ID, grade N strand ID, and section name are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when grade N strand ID is missing", async () => {
    await expect(gradeSectionsService.createGradeSection(1, null, 3, "11-STEM-A", "Science section")).rejects.toThrow(
      "School year ID, grade N strand ID, and section name are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when section name is missing", async () => {
    await expect(gradeSectionsService.createGradeSection(1, 2, 3, "", "Science section")).rejects.toThrow(
      "School year ID, grade N strand ID, and section name are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllGradeSections", () => {
  it("should return all grade sections", async () => {
    const mockRows = [
      {
        grade_section_id: 1,
        school_year_id: 1,
        grade_n_strand_id: 2,
        adviser_staff_id: 3,
        section_name: "11-STEM-A",
        description: "Science section",
      },
      {
        grade_section_id: 2,
        school_year_id: 1,
        grade_n_strand_id: 3,
        adviser_staff_id: 4,
        section_name: "11-ABM-A",
        description: "Business section",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await gradeSectionsService.findAllGradeSections();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_GRADE_SECTIONS);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no grade sections exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await gradeSectionsService.findAllGradeSections();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_GRADE_SECTIONS);

    expect(result).toEqual([]);
  });
});

describe("findGradeSectionById", () => {
  it("should return a grade section by ID", async () => {
    const mockGradeSection = {
      grade_section_id: 1,
      school_year_id: 1,
      grade_n_strand_id: 2,
      adviser_staff_id: 3,
      section_name: "11-STEM-A",
      description: "Science section",
    };

    mockDb.query.mockResolvedValueOnce([[mockGradeSection]]);

    const result = await gradeSectionsService.findGradeSectionById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_GRADE_SECTION_BY_ID, [1]);

    expect(result).toEqual(mockGradeSection);
  });

  it("should return null when the grade section does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await gradeSectionsService.findGradeSectionById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_GRADE_SECTION_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(gradeSectionsService.findGradeSectionById()).rejects.toThrow("Grade section ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findGradeSectionsBySchoolYear", () => {
  it("should return grade sections by school year", async () => {
    const mockRows = [
      {
        grade_section_id: 1,
        school_year_id: 1,
        grade_n_strand_id: 2,
        adviser_staff_id: 3,
        section_name: "11-STEM-A",
        description: "Science section",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await gradeSectionsService.findGradeSectionsBySchoolYear(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_GRADE_SECTIONS_BY_SCHOOL_YEAR, [1]);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no sections exist for the school year", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await gradeSectionsService.findGradeSectionsBySchoolYear(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_GRADE_SECTIONS_BY_SCHOOL_YEAR, [999]);

    expect(result).toEqual([]);
  });

  it("should throw an error when school year ID is missing", async () => {
    await expect(gradeSectionsService.findGradeSectionsBySchoolYear()).rejects.toThrow("School year ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findGradeSectionsByGradeNStrand", () => {
  it("should return grade sections by grade N strand", async () => {
    const mockRows = [
      {
        grade_section_id: 1,
        school_year_id: 1,
        grade_n_strand_id: 2,
        adviser_staff_id: 3,
        section_name: "11-STEM-A",
        description: "Science section",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await gradeSectionsService.findGradeSectionsByGradeNStrand(2);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_GRADE_SECTIONS_BY_GRADE_N_STRAND, [2]);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no sections exist for the grade N strand", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await gradeSectionsService.findGradeSectionsByGradeNStrand(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_GRADE_SECTIONS_BY_GRADE_N_STRAND, [999]);

    expect(result).toEqual([]);
  });

  it("should throw an error when grade N strand ID is missing", async () => {
    await expect(gradeSectionsService.findGradeSectionsByGradeNStrand()).rejects.toThrow(
      "Grade N strand ID is required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findGradeSectionsByAdviser", () => {
  it("should return grade sections by adviser", async () => {
    const mockRows = [
      {
        grade_section_id: 1,
        school_year_id: 1,
        grade_n_strand_id: 2,
        adviser_staff_id: 3,
        section_name: "11-STEM-A",
        description: "Science section",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await gradeSectionsService.findGradeSectionsByAdviser(3);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_GRADE_SECTIONS_BY_ADVISER, [3]);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when the adviser has no sections", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await gradeSectionsService.findGradeSectionsByAdviser(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_GRADE_SECTIONS_BY_ADVISER, [999]);

    expect(result).toEqual([]);
  });

  it("should throw an error when adviser staff ID is missing", async () => {
    await expect(gradeSectionsService.findGradeSectionsByAdviser()).rejects.toThrow("Adviser staff ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findGradeSection", () => {
  it("should return a specific grade section", async () => {
    const mockGradeSection = {
      grade_section_id: 1,
      school_year_id: 1,
      grade_n_strand_id: 2,
      adviser_staff_id: 3,
      section_name: "11-STEM-A",
      description: "Science section",
    };

    mockDb.query.mockResolvedValueOnce([[mockGradeSection]]);

    const result = await gradeSectionsService.findGradeSection(1, 2, "11-STEM-A");

    expect(mockDb.query).toHaveBeenCalledWith(FIND_GRADE_SECTION, [1, 2, "11-STEM-A"]);

    expect(result).toEqual(mockGradeSection);
  });

  it("should return null when the grade section does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await gradeSectionsService.findGradeSection(1, 2, "Unknown");

    expect(mockDb.query).toHaveBeenCalledWith(FIND_GRADE_SECTION, [1, 2, "Unknown"]);

    expect(result).toBeNull();
  });

  it("should throw an error when school year ID is missing", async () => {
    await expect(gradeSectionsService.findGradeSection(null, 2, "11-STEM-A")).rejects.toThrow(
      "School year ID, grade N strand ID, and section name are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when grade N strand ID is missing", async () => {
    await expect(gradeSectionsService.findGradeSection(1, null, "11-STEM-A")).rejects.toThrow(
      "School year ID, grade N strand ID, and section name are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when section name is missing", async () => {
    await expect(gradeSectionsService.findGradeSection(1, 2, "")).rejects.toThrow(
      "School year ID, grade N strand ID, and section name are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("updateGradeSection", () => {
  it("should update a grade section successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await gradeSectionsService.updateGradeSection(1, 1, 2, 3, "11-STEM-A", "Updated science section");

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_GRADE_SECTION, [
      1,
      2,
      3,
      "11-STEM-A",
      "Updated science section",
      1,
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(
      gradeSectionsService.updateGradeSection(null, 1, 2, 3, "11-STEM-A", "Science section"),
    ).rejects.toThrow("Grade section ID, school year ID, grade N strand ID, and section name are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when school year ID is missing", async () => {
    await expect(
      gradeSectionsService.updateGradeSection(1, null, 2, 3, "11-STEM-A", "Science section"),
    ).rejects.toThrow("Grade section ID, school year ID, grade N strand ID, and section name are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when grade N strand ID is missing", async () => {
    await expect(
      gradeSectionsService.updateGradeSection(1, 1, null, 3, "11-STEM-A", "Science section"),
    ).rejects.toThrow("Grade section ID, school year ID, grade N strand ID, and section name are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when section name is missing", async () => {
    await expect(gradeSectionsService.updateGradeSection(1, 1, 2, 3, "", "Science section")).rejects.toThrow(
      "Grade section ID, school year ID, grade N strand ID, and section name are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteGradeSection", () => {
  it("should delete a grade section successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await gradeSectionsService.deleteGradeSection(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_GRADE_SECTION, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when grade section ID is missing", async () => {
    await expect(gradeSectionsService.deleteGradeSection()).rejects.toThrow("Grade section ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no grade section was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await gradeSectionsService.deleteGradeSection(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_GRADE_SECTION, [999]);

    expect(result).toEqual(mockResult);
  });
});
