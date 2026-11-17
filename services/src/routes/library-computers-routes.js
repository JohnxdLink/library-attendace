const { Router } = require("express");

const authenticate = require("../middleware/authenticate.js");
const libraryComputerController = require("../controller/library_computers-controller.js");

const router = Router();

router.use(authenticate);

router.get("/", libraryComputerController.findAllLibraryComputers);
router.get(":id", libraryComputerController.findLibraryComputerById);
router.post("/", libraryComputerController.createLibraryComputer);
router.put("/:id", libraryComputerController.updateLibraryComputer);
router.delete("/:id", libraryComputerController.deleteLibraryComputer);

module.export = router;
