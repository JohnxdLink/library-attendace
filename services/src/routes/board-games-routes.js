const { Router } = require("express");

const authenticate = require("../middleware/authenticate.js");
const boardGamesController = require("../controller/board_games-controller.js");

const router = Router();

router.use(authenticate);

router.get("/", boardGamesController.findAllBoardGames);
router.get("/:id", boardGamesController.findBoardGameById);
router.post("/", boardGamesController.createBoardGame);
router.put("/:id", boardGamesController.updateBoardGame);
router.delete("/:id", boardGamesController.deleteBoardGame);

module.export = router;
