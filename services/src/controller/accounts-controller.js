const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const accountsService = require("../services/accounts-service.js");

const createAccount = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await accountsService.createAccount(username, password);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Account created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Account created error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const findAllAccounts = async (req, res) => {
  try {
    const result = await accountsService.findAllAccounts();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Accounts retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find all accounts error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: true,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const findAccountById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await accountsService.findAccountById(id);
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Account not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Account retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Findy account by ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const findAccountByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const result = await accountsService.findAccountByUsername(username);
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Account not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Account retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Findy account by username error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    const result = await accountsService.updateAccount(id, username, password);

    return res.status(StatusCodes.Ok).json({
      success: true,
      message: "Account updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Account update error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await accountsService.deleteAccount(id);
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Account not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Account deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Account delete error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  createAccount,
  findAllAccounts,
  findAccountById,
  findAccountByUsername,
  updateAccount,
  deleteAccount,
};
