const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const gradeSectionsService = require("../services/grade-sections-service.js");

const createGradeSection = async (req, res) => {
  try {
    const { school_year_id, grade_n_strand_id, adviser_staff_id, section_name, description } = req.body;

    const result = await gradeSectionsService.createGradeSection(
      school_year_id,
      grade_n_strand_id,
      adviser_staff_id,
      section_name,
      description,
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Grade section created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Grade section creation error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const findAllGradeSections = async (req, res) => {
  try {
    const result = await gradeSectionsService.findAllGradeSections();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Grade sections retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find all grade sections error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const findGradeSectionById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await gradeSectionsService.findGradeSectionById(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Grade section not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Grade section retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find grade section by ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const findGradeSectionsBySchoolYear = async (req, res) => {
  try {
    const { school_year_id } = req.params;

    const result = await gradeSectionsService.findGradeSectionsBySchoolYear(school_year_id);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Grade sections by school year retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find grade sections by school year error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const findGradeSectionsByGradeNStrand = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await gradeSectionsService.findGradeSectionsByGradeNStrand(id);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Grade sections by grade and strand retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find grade sections by grade and strand error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const findGradeSectionsByAdviser = async (req, res) => {
  try {
    const { adviser_staff_id } = req.params;

    const result = await gradeSectionsService.findGradeSectionsByAdviser(adviser_staff_id);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Grade sections by adviser retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find grade sections by adviser error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const findGradeSection = async (req, res) => {
  try {
    const { school_year_id, grade_n_strand_id, section_name } = req.query;

    const result = await gradeSectionsService.findGradeSection(school_year_id, grade_n_strand_id, section_name);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Grade section not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Grade section retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find specific grade section error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const updateGradeSection = async (req, res) => {
  try {
    const { id } = req.params;

    const { school_year_id, grade_n_strand_id, adviser_staff_id, section_name, description } = req.body;

    const result = await gradeSectionsService.updateGradeSection(
      id,
      school_year_id,
      grade_n_strand_id,
      adviser_staff_id,
      section_name,
      description,
    );

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Grade section not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Grade section updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Grade section update error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const deleteGradeSection = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await gradeSectionsService.deleteGradeSection(id);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Grade section not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Grade section deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Grade section delete error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  createGradeSection,
  findAllGradeSections,
  findGradeSectionById,
  findGradeSectionsBySchoolYear,
  findGradeSectionsByGradeNStrand,
  findGradeSectionsByAdviser,
  findGradeSection,
  updateGradeSection,
  deleteGradeSection,
};
