const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const studentsService = require("../services/students-service.js");

// CREATE
const createStudents = async (req, res) => {
  try {
    const { grade_section_id, account_id, lastname, firstname, middlename, contact_no, created_at, updated_at } =
      req.body;

    const result = await studentsService.createStudents(
      grade_section_id,
      account_id,
      lastname,
      firstname,
      middlename,
      contact_no,
      created_at,
      updated_at,
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Student created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Student creation error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get all students
const findAllStudents = async (req, res) => {
  try {
    const result = await studentsService.findAllStudents();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Students retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find all students error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get student by ID
const findStudentsById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await studentsService.findStudentsById(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Student not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Student retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find student by ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// UPDATE
const updateStudents = async (req, res) => {
  try {
    const { id } = req.params;

    const { grade_section_id, account_id, lastname, firstname, middlename, contact_no, created_at, updated_at } =
      req.body;

    const result = await studentsService.updateStudents(
      id,
      grade_section_id,
      account_id,
      lastname,
      firstname,
      middlename,
      contact_no,
      created_at,
      updated_at,
    );

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Student not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Student updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Student update error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// DELETE
const deleteStudents = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await studentsService.deleteStudents(id);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Student not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Student deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Student delete error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  createStudents,
  findAllStudents,
  findStudentsById,
  updateStudents,
  deleteStudents,
};
