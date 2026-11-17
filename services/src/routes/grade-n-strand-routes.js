const { Router } = require("express");

const authenticate = require("../middleware/authenticate.js");
const gradeNStrandsController = require("../controller/grade-n-strands-controller.js");

const router = Router();

router.use(authenticate);

router.get("/", gradeNStrandsController.findAllGradeNStrands);
router.get("/:id", gradeNStrandsController.findGradeNStrandById);
router.get("/", gradeNStrandsController.findGradeNStrand);
router.post("/", gradeNStrandsController.createGradeNStrand);
router.put("/:id", gradeNStrandsController.updateGradeNStrand);
router.delete("/:grade_n_strand_id", gradeNStrandsController.deleteGradeNStrand);

module.export = router;
