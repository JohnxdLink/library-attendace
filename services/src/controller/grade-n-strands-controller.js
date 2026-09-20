const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const gradeNStrandsService = require("../services/grade-n-strands-service.js");

const createGradeNStrand = async (req, res) => {
  try {
    const { grade_level, strand, description } = req.body;

    const result = await gradeNStrandsService.createGradeNStrand(grade_level, strand, description);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Grade and strand created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Grade and strand creation error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const findAllGradeNStrands = async (req, res) => {
  try {
    const result = await gradeNStrandsService.findAllGradeNStrands();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Grade levels and strands retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find all grade and strand error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const findGradeNStrandById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await gradeNStrandsService.findGradeNStrandById(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Grade and strand not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Grade and strand retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find grade and strand by ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const findGradeNStrand = async (req, res) => {
  try {
    const { grade_level, strand } = req.query;

    const result = await gradeNStrandsService.findGradeNStrand(grade_level, strand);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Grade and strand not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Grade and strand retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find grade and strand error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const updateGradeNStrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { grade_level, strand, description } = req.body;

    const result = await gradeNStrandsService.updateGradeNStrand(id, grade_level, strand, description);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Grade and strand not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Grade and strand updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Grade and strand update error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const deleteGradeNStrand = async (req, res) => {
  try {
    const { grade_n_strand_id } = req.params;

    const result = await gradeNStrandsService.deleteGradeNStrand(grade_n_strand_id);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Grade and strand not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Grade and strand deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Grade and strand delete error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  createGradeNStrand,
  findAllGradeNStrands,
  findGradeNStrandById,
  findGradeNStrand,
  updateGradeNStrand,
  deleteGradeNStrand,
};
