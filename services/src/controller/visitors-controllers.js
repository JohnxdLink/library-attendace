const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const visitorsService = require("../services/visitors-service.js");

// CREATE
const createVisitor = async (req, res) => {
  try {
    const { visitor_name, visitor_type, contact_no, purpose, person_to_visit, time_in, time_out, visit_date, remarks } =
      req.body;

    const result = await visitorsService.createVisitor(
      visitor_name,
      visitor_type,
      contact_no,
      purpose,
      person_to_visit,
      time_in,
      time_out,
      visit_date,
      remarks,
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Visitor created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Visitor creation error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get all visitors
const findAllVisitors = async (req, res) => {
  try {
    const result = await visitorsService.findAllVisitors();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Visitors retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find all visitors error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get visitor by ID
const findVisitorById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await visitorsService.findVisitorById(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Visitor not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Visitor retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find visitor by ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// UPDATE
const updateVisitor = async (req, res) => {
  try {
    const { id } = req.params;

    const { visitor_name, visitor_type, contact_no, purpose, person_to_visit, time_in, time_out, visit_date, remarks } =
      req.body;

    const result = await visitorsService.updateVisitor(
      id,
      visitor_name,
      visitor_type,
      contact_no,
      purpose,
      person_to_visit,
      time_in,
      time_out,
      visit_date,
      remarks,
    );

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Visitor not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Visitor updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Visitor update error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// DELETE
const deleteVisitor = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await visitorsService.deleteVisitor(id);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Visitor not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Visitor deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Visitor delete error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  createVisitor,
  findAllVisitors,
  findVisitorById,
  updateVisitor,
  deleteVisitor,
};
