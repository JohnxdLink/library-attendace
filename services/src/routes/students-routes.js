const { Router } = require("express");

const authenticate = require("../middleware/authenticate.js");
const studentsController = require("../controller/students-controller.js");

const router = Router();

router.use(authenticate);

router.get("/", studentsController.findAllStudents);
router.get("/:id", studentsController.findStudentById);
router.post("/", studentsController.createStudent);
router.put("/:id", studentsController.updateStudent);
router.delete("/:id", studentsController.deleteStudent);

module.export = router;
