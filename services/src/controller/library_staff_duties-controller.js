const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const libraryStaffDutiesService = require("../services/library-staff-duties-service.js");

// CREATE
const createLibraryStaffDuty = async (req, res) => {
  try {
    const { staff_id, duty_date, time_in, time_out, remarks } = req.body;

    const result = await libraryStaffDutiesService.createLibraryStaffDuty(
      staff_id,
      duty_date,
      time_in,
      time_out,
      remarks,
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Library staff duty created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Library staff duty creation error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get all library staff duties
const findAllLibraryStaffDuties = async (req, res) => {
  try {
    const result = await libraryStaffDutiesService.findAllLibraryStaffDuties();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Library staff duties retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find all library staff duties error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get library staff duty by ID
const findLibraryStaffDutyById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await libraryStaffDutiesService.findLibraryStaffDutyById(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Library staff duty not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Library staff duty retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find library staff duty by ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// UPDATE
const updateLibraryStaffDuty = async (req, res) => {
  try {
    const { id } = req.params;

    const { staff_id, duty_date, time_in, time_out, remarks } = req.body;

    const result = await libraryStaffDutiesService.updateLibraryStaffDuty(
      id,
      staff_id,
      duty_date,
      time_in,
      time_out,
      remarks,
    );

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Library staff duty not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Library staff duty updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Library staff duty update error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// DELETE
const deleteLibraryStaffDuty = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await libraryStaffDutiesService.deleteLibraryStaffDuty(id);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Library staff duty not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Library staff duty deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Library staff duty delete error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  createLibraryStaffDuty,
  findAllLibraryStaffDuties,
  findLibraryStaffDutyById,
  updateLibraryStaffDuty,
  deleteLibraryStaffDuty,
};
