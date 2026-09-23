const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const boardGamesService = require("../services/board-games-service.js");

// CREATE
const createBoardGame = async (req, res) => {
  try {
    const { game_name, description, quantity, status } = req.body;

    const result = await boardGamesService.createBoardGame(game_name, description, quantity, status);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Board game created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Board game creation error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get all board games
const findAllBoardGames = async (req, res) => {
  try {
    const result = await boardGamesService.findAllBoardGames();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Board games retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find all board games error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get board game by ID
const findBoardGameById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await boardGamesService.findBoardGameById(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Board game not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Board game retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find board game by ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// UPDATE
const updateBoardGame = async (req, res) => {
  try {
    const { id } = req.params;

    const { game_name, description, quantity, status } = req.body;

    const result = await boardGamesService.updateBoardGame(id, game_name, description, quantity, status);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Board game not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Board game updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Board game update error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// DELETE
const deleteBoardGame = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await boardGamesService.deleteBoardGame(id);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Board game not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Board game deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Board game delete error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  createBoardGame,
  findAllBoardGames,
  findBoardGameById,
  updateBoardGame,
  deleteBoardGame,
};
