const db = require("../config/database.js");
const {
  CREATE_GRADE_N_STRAND,
  FIND_ALL_GRADE_N_STRANDS,
  FIND_GRADE_N_STRAND_BY_ID,
  FIND_GRADE_N_STRAND,
  UPDATE_GRADE_N_STRAND,
  DELETE_GRADE_N_STRAND,
} = require("../database/queries/grade_n_strands-query.js");

// CREATE
const createGradeNStrand = async (grade_level, strand, description) => {
  if (!grade_level || !strand) {
    throw new Error("Grade level and strand are required.");
  }

  const [result] = await db.query(CREATE_GRADE_N_STRAND, [grade_level, strand, description]);

  return result;
};

// READ - Get all grade levels and strands
const findAllGradeNStrands = async () => {
  const [rows] = await db.query(FIND_ALL_GRADE_N_STRANDS);

  return rows;
};

// READ - Get grade level and strand by ID
const findGradeNStrandById = async (id) => {
  if (!id) {
    throw new Error("Grade N Strand ID is required.");
  }

  const [rows] = await db.query(FIND_GRADE_N_STRAND_BY_ID, [id]);

  return rows[0] || null;
};

// READ - Get by grade level and strand
const findGradeNStrand = async (grade_level, strand) => {
  if (!grade_level || !strand) {
    throw new Error("Grade level and strand are required.");
  }

  const [rows] = await db.query(FIND_GRADE_N_STRAND, [grade_level, strand]);

  return rows[0] || null;
};

// UPDATE
const updateGradeNStrand = async (id, grade_level, strand, description) => {
  if (!id || !grade_level || !strand) {
    throw new Error("Grade N Strand ID, grade level, and strand are required.");
  }

  const [result] = await db.query(UPDATE_GRADE_N_STRAND, [grade_level, strand, description, id]);

  return result;
};

// DELETE
const deleteGradeNStrand = async (id) => {
  if (!id) {
    throw new Error("Grade N Strand ID is required.");
  }

  const [result] = await db.query(DELETE_GRADE_N_STRAND, [id]);

  return result;
};

module.exports = {
  createGradeNStrand,
  findAllGradeNStrands,
  findGradeNStrandById,
  findGradeNStrand,
  updateGradeNStrand,
  deleteGradeNStrand,
};
