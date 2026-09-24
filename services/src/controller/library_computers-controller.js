const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const libraryComputerService = require("../services/library_computer-service.js");

// CREATE
const createLibraryComputer = async (req, res) => {
  try {
    const { computer_number, status } = req.body;

    const result = await libraryComputerService.createLibraryComputer(computer_number, status);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Library computer created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Library computer creation error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get all library computers
const findAllLibraryComputers = async (req, res) => {
  try {
    const result = await libraryComputerService.findAllLibraryComputers();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Library computers retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find all library computers error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get library computer by ID
const findLibraryComputerById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await libraryComputerService.findLibraryComputerById(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Library computer not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Library computer retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find library computer by ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// UPDATE
const updateLibraryComputer = async (req, res) => {
  try {
    const { id } = req.params;

    const { computer_number, status } = req.body;

    const result = await libraryComputerService.updateLibraryComputer(id, computer_number, status);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Library computer not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Library computer updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Library computer update error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// DELETE
const deleteLibraryComputer = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await libraryComputerService.deleteLibraryComputer(id);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Library computer not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Library computer deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Library computer delete error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  createLibraryComputer,
  findAllLibraryComputers,
  findLibraryComputerById,
  updateLibraryComputer,
  deleteLibraryComputer,
};
