const { Router } = require("express");

const authenticate = require("../middleware/authenticate.js");
const libraryStaffDutiesController = require("../controller/library_staff_duties-controller.js");

const router = Router();

router.use(authenticate);

router.get("/", libraryStaffDutiesController.findAllLibraryStaffDuties);
router.get("/:id", libraryStaffDutiesController.findLibraryStaffDutyById);
router.post("/", libraryStaffDutiesController.createLibraryStaffDuty);
router.put("/:id", libraryStaffDutiesController.updateLibraryStaffDuty);
router.delete("/:id", libraryStaffDutiesController.deleteLibraryStaffDuty);

module.export = router;
