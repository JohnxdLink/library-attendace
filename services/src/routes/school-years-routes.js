const { Router } = require("express");

const authenticate = require("../middleware/authenticate.js");
const schoolYearsController = require("../controller/school-years-controller.js");

const router = Router();

router.use(authenticate);
router.get("/", schoolYearsController.findActiveSchoolYear);

router.get("/", schoolYearsController.findAllSchoolYears);
router.get("/:id", schoolYearsController.findSchoolYearById);
router.get("/", schoolYearsController.findSchoolYearByYear);
router.post("/", schoolYearsController.createSchoolYear);
router.put("/:id", schoolYearsController.updateSchoolYear);
router.delete("/:id", schoolYearsController.deleteSchoolYear);

module.export = router;
