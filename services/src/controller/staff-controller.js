const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const staffService = require("../services/staff-service.js");

const createStaff = async (req, res) => {
  try {
    const { account_id, role_id, lastname, firstname, contact_no, email } = req.body;

    const result = await staffService.createStaff(account_id, role_id, lastname, firstname, contact_no, email);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Staff created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Staff created error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const findAllStaffs = async (req, res) => {
  try {
    const result = await staffService.findAllStaffs();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Staffs retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find all staffs error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const findStaffById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await staffService.findStaffById(id);
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Staff not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Staff retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find staff by ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.message,
    });
  }
};

const findStaffByAccountId = async (req, res) => {
  try {
    const { account_id } = req.params;

    const result = await staffService.findStaffByAccountId(account_id);
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Staff not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Staff retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find staff by account ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.message,
    });
  }
};

const findStaffByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const result = await staffService.findStaffByAccountId(email);
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Staff not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Staff retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find staff by email error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.message,
    });
  }
};

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { account_id, role_id, lastname, firstname, contact_no, email } = req.body;

    const result = await staffService.updateStaff(id, account_id, role_id, lastname, firstname, contact_no, email);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Staff updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Staff update error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await staffService.deleteStaff(id);
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: true,
        message: "Staff not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Staff deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Staff delete error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  createStaff,
  findAllStaffs,
  findStaffById,
  findStaffByAccountId,
  findStaffByEmail,
  updateStaff,
  deleteStaff,
};
