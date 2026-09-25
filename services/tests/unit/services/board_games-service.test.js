//  MOCK the db module BEFORE importing service
jest.mock("../../../src/config/database.js", () => ({
  query: jest.fn(),
}));

const mockDb = require("../../../src/config/database.js");

const boardGamesService = require("../../../src/services/board_games-service.js");

const {
  CREATE_BOARD_GAME,
  FIND_ALL_BOARD_GAMES,
  FIND_BOARD_GAME_BY_ID,
  UPDATE_BOARD_GAME,
  DELETE_BOARD_GAME,
} = require("../../../src/database/queries/board_games-query.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createBoardGame", () => {
  it("should create a board game successfully", async () => {
    const mockResult = {
      insertId: 1,
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await boardGamesService.createBoardGame("Chess", "Classic strategy board game", 5, "Available");

    expect(mockDb.query).toHaveBeenCalledWith(CREATE_BOARD_GAME, [
      "Chess",
      "Classic strategy board game",
      5,
      "Available",
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when game name is missing", async () => {
    await expect(boardGamesService.createBoardGame("", "Classic strategy board game", 5, "Available")).rejects.toThrow(
      "Game name and quantity are required.",
    );

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("findAllBoardGames", () => {
  it("should return all board games", async () => {
    const mockRows = [
      {
        board_game_id: 1,
        game_name: "Chess",
        description: "Classic strategy board game",
        quantity: 5,
        status: "Available",
      },
      {
        board_game_id: 2,
        game_name: "Monopoly",
        description: "Property trading board game",
        quantity: 3,
        status: "Available",
      },
    ];

    mockDb.query.mockResolvedValueOnce([mockRows]);

    const result = await boardGamesService.findAllBoardGames();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_BOARD_GAMES);

    expect(result).toEqual(mockRows);
  });

  it("should return an empty array when no board games exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await boardGamesService.findAllBoardGames();

    expect(mockDb.query).toHaveBeenCalledWith(FIND_ALL_BOARD_GAMES);

    expect(result).toEqual([]);
  });
});

describe("findBoardGameById", () => {
  it("should return a board game by ID", async () => {
    const mockBoardGame = {
      board_game_id: 1,
      game_name: "Chess",
      description: "Classic strategy board game",
      quantity: 5,
      status: "Available",
    };

    mockDb.query.mockResolvedValueOnce([[mockBoardGame]]);

    const result = await boardGamesService.findBoardGameById(1);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_BOARD_GAME_BY_ID, [1]);

    expect(result).toEqual(mockBoardGame);
  });

  it("should return null when the board game does not exist", async () => {
    mockDb.query.mockResolvedValueOnce([[]]);

    const result = await boardGamesService.findBoardGameById(999);

    expect(mockDb.query).toHaveBeenCalledWith(FIND_BOARD_GAME_BY_ID, [999]);

    expect(result).toBeNull();
  });

  it("should throw an error when ID is missing", async () => {
    await expect(boardGamesService.findBoardGameById()).rejects.toThrow("Board Game ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("updateBoardGame", () => {
  it("should update a board game successfully", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await boardGamesService.updateBoardGame(1, "Chess", "Updated chess description", 10, "Available");

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_BOARD_GAME, [
      "Chess",
      "Updated chess description",
      10,
      "Available",
      1,
    ]);

    expect(result).toEqual(mockResult);
  });

  it("should allow quantity to be zero", async () => {
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await boardGamesService.updateBoardGame(1, "Chess", "No available copies", 0, "Unavailable");

    expect(mockDb.query).toHaveBeenCalledWith(UPDATE_BOARD_GAME, ["Chess", "No available copies", 0, "Unavailable", 1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when ID is missing", async () => {
    await expect(
      boardGamesService.updateBoardGame(null, "Chess", "Classic strategy board game", 5, "Available"),
    ).rejects.toThrow("Board Game ID, game name, and quantity are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when game name is missing", async () => {
    await expect(
      boardGamesService.updateBoardGame(1, "", "Classic strategy board game", 5, "Available"),
    ).rejects.toThrow("Board Game ID, game name, and quantity are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should throw an error when quantity is missing", async () => {
    await expect(
      boardGamesService.updateBoardGame(1, "Chess", "Classic strategy board game", null, "Available"),
    ).rejects.toThrow("Board Game ID, game name, and quantity are required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });
});

describe("deleteBoardGame", () => {
  it("should delete a board game successfully", async () => {
    const mockResult = {
      affectedRows: 1,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await boardGamesService.deleteBoardGame(1);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_BOARD_GAME, [1]);

    expect(result).toEqual(mockResult);
  });

  it("should throw an error when board game ID is missing", async () => {
    await expect(boardGamesService.deleteBoardGame()).rejects.toThrow("Board Game ID is required.");

    expect(mockDb.query).not.toHaveBeenCalled();
  });

  it("should return the database result when no board game was deleted", async () => {
    const mockResult = {
      affectedRows: 0,
    };

    mockDb.query.mockResolvedValueOnce([mockResult]);

    const result = await boardGamesService.deleteBoardGame(999);

    expect(mockDb.query).toHaveBeenCalledWith(DELETE_BOARD_GAME, [999]);

    expect(result).toEqual(mockResult);
  });
});
