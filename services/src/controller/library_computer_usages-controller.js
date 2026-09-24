const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const libraryComputerUsagesService = require("../services/library_computer_usages-service.js");

// CREATE
const createLibraryComputerUsage = async (req, res) => {
  try {
    const { student_id, computer_id, usage_date, time_in, time_out, purpose } = req.body;

    const result = await libraryComputerUsagesService.createLibraryComputerUsage(
      student_id,
      computer_id,
      usage_date,
      time_in,
      time_out,
      purpose,
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Library computer usage created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Library computer usage creation error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get all library computer usages
const findAllLibraryComputerUsages = async (req, res) => {
  try {
    const result = await libraryComputerUsagesService.findAllLibraryComputerUsages();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Library computer usages retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find all library computer usages error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get library computer usage by ID
const findLibraryComputerUsageById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await libraryComputerUsagesService.findLibraryComputerUsageById(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Library computer usage not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Library computer usage retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find library computer usage by ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// UPDATE
const updateLibraryComputerUsage = async (req, res) => {
  try {
    const { id } = req.params;

    const { student_id, computer_id, usage_date, time_in, time_out, purpose } = req.body;

    const result = await libraryComputerUsagesService.updateLibraryComputerUsage(
      id,
      student_id,
      computer_id,
      usage_date,
      time_in,
      time_out,
      purpose,
    );

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Library computer usage not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Library computer usage updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Library computer usage update error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// DELETE
const deleteLibraryComputerUsage = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await libraryComputerUsagesService.deleteLibraryComputerUsage(id);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Library computer usage not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Library computer usage deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Library computer usage delete error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  createLibraryComputerUsage,
  findAllLibraryComputerUsages,
  findLibraryComputerUsageById,
  updateLibraryComputerUsage,
  deleteLibraryComputerUsage,
};
