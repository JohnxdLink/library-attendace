const { Router } = require("express");

const authenticate = require("../middleware/authenticate.js");
const gradeSectionsController = require("../controller/grade-sections-controller.js");

const router = Router();

router.use(authenticate);

router.get("/", gradeSectionsController.findAllGradeSections);
router.get("/:id", gradeSectionsController.findGradeSectionById);
router.get("/", gradeSectionsController.findGradeSection);
router.get("/:adviser_staff_id", gradeSectionsController.findGradeSectionsByAdviser);
router.get("/:id", gradeSectionsController.findGradeSectionsByGradeNStrand);
router.get("/:school_year_id", gradeSectionsController.findGradeSectionsBySchoolYear);
router.post("/", gradeSectionsController.createGradeSection);
router.put("/:id", gradeSectionsController.updateGradeSection);
router.delete("/:id", gradeSectionsController.deleteGradeSection);

module.export = router;
