//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const gradeNStrandsService = require("../../../src/services/grade-n-strands-service.js");

const {
  CREATE_GRADE_N_STRAND,
  FIND_ALL_GRADE_N_STRANDS,
  FIND_GRADE_N_STRAND_BY_ID,
  FIND_GRADE_N_STRAND,
  UPDATE_GRADE_N_STRAND,
  DELETE_GRADE_N_STRAND,
} = require("../../../src/database/queries/grade_n_strands-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createGradeNStrand", () => {
  it("should create a grade n strand successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await gradeNStrandsService.createGradeNStrand(
      "Grade 11",
      "STEM",
      "Science, Technology, Engineering, and Mathematics",
    );

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_GRADE_N_STRAND, [
      "Grade 11",
      "STEM",
      "Science, Technology, Engineering, and Mathematics",
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when grade level is missing", async () => {
    await expect(gradeNStrandsService.createGradeNStrand("", "STEM", "Science strand")).rejects.toThrow(
      "Grade level and strand are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when strand is missing", async () => {
    await expect(gradeNStrandsService.createGradeNStrand("Grade 11", "", "Science strand")).rejects.toThrow(
      "Grade level and strand are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllGradeNStrands", () => {
  it("should return all grade levels and strands", async () => {
    const mockRows = [
      {
        grade_n_strand_id: 1,
        grade_level: "Grade 11",
        strand: "STEM",
        description: "Science strand",
      },
      {
        grade_n_strand_id: 2,
        grade_level: "Grade 12",
        strand: "ABM",
        description: "Business strand",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await gradeNStrandsService.findAllGradeNStrands();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_GRADE_N_STRANDS);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no grade n strands exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await gradeNStrandsService.findAllGradeNStrands();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_GRADE_N_STRANDS);

    expect(result).toEqual([]);
  });
});

describe("findGradeNStrandById", () => {
  it("should return a grade n strand by ID", async () => {
    const mockGradeNStrand = {
      grade_n_strand_id: 1,
      grade_level: "Grade 11",
      strand: "STEM",
      description: "Science strand",
    };

    mockDb.query.mockResolvedValueOnce([[mockGradeNStrand]]);

    const result = await gradeNStrandsService.findGradeNStrandById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_GRADE_N_STRAND_BY_ID, [1]);

    expect(result).toEqual(mockGradeNStrand);
  });

  it("should return null when the grade n strand does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await gradeNStrandsService.findGradeNStrandById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_GRADE_N_STRAND_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(gradeNStrandsService.findGradeNStrandById()).rejects.toThrow("Grade N Strand ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findGradeNStrand", () => {
  it("should return a grade n strand by grade level and strand", async () => {
    const mockGradeNStrand = {
      grade_n_strand_id: 1,
      grade_level: "Grade 11",
      strand: "STEM",
      description: "Science strand",
    };

    mockDb.query.mockResolvedValueOnce([[mockGradeNStrand]]);

    const result = await gradeNStrandsService.findGradeNStrand("Grade 11", "STEM");

    expect(mockDb.query).toHaveBeenCalledWith(FIND_GRADE_N_STRAND, ["Grade 11", "STEM"]);

    expect(result).toEqual(mockGradeNStrand);
  });

  it("should return null when the grade n strand does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await gradeNStrandsService.findGradeNStrand("Grade 11", "Unknown");

    expect(mockDb.query).toHaveBeenCalledWith(FIND_GRADE_N_STRAND, ["Grade 11", "Unknown"]);

    expect(result).toBeNull();
  });

  it("should throw an error when grade level is missing", async () => {
    await expect(gradeNStrandsService.findGradeNStrand("", "STEM")).rejects.toThrow(
      "Grade level and strand are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when strand is missing", async () => {
    await expect(gradeNStrandsService.findGradeNStrand("Grade 11", "")).rejects.toThrow(
      "Grade level and strand are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("updateGradeNStrand", () => {
  it("should update a grade n strand successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await gradeNStrandsService.updateGradeNStrand(1, "Grade 12", "STEM", "Updated science strand");

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_GRADE_N_STRAND, ["Grade 12", "STEM", "Updated science strand", 1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(gradeNStrandsService.updateGradeNStrand(null, "Grade 12", "STEM", "Science strand")).rejects.toThrow(
      "Grade N Strand ID, grade level, and strand are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when grade level is missing", async () => {
    await expect(gradeNStrandsService.updateGradeNStrand(1, "", "STEM", "Science strand")).rejects.toThrow(
      "Grade N Strand ID, grade level, and strand are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when strand is missing", async () => {
    await expect(gradeNStrandsService.updateGradeNStrand(1, "Grade 12", "", "Science strand")).rejects.toThrow(
      "Grade N Strand ID, grade level, and strand are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteGradeNStrand", () => {
  it("should delete a grade n strand successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await gradeNStrandsService.deleteGradeNStrand(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_GRADE_N_STRAND, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when grade n strand ID is missing", async () => {
    await expect(gradeNStrandsService.deleteGradeNStrand()).rejects.toThrow("Grade N Strand ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no grade n strand was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await gradeNStrandsService.deleteGradeNStrand(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_GRADE_N_STRAND, [999]);

    expect(result).toEqual(mockResult);
  });
});
