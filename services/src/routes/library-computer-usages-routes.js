const { Router } = require("express");

const authenticate = require("../middleware/authenticate.js");
const libraryComputerUsagesController = require("../controller/library_computer_usages-controller.js");

const router = Router();

router.use(authenticate);

router.get("/", libraryComputerUsagesController.findAllLibraryComputerUsages);
router.get("/:id", libraryComputerUsagesController.findLibraryComputerUsageById);
router.post("/", libraryComputerUsagesController.createLibraryComputerUsage);
router.put("/:id", libraryComputerUsagesController.updateLibraryComputerUsage);
router.delete("/:id", libraryComputerUsagesController.deleteLibraryComputerUsage);

module.export = router;
