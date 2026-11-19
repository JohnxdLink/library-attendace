const { Router } = require("express");

const authenticate = require("../middleware/authenticate.js");
const attendanceReportsController = require("../controller/attendance_reports-controller.js");

const router = Router();

router.use(authenticate);

// ✅ LGTM
router.get("/", attendanceReportsController.findAllAttendanceReports);
router.get("/:id", attendanceReportsController.findAttendanceReportById);
router.post("/", attendanceReportsController.createAttendanceReport);
router.put("/:id", attendanceReportsController.updateAttendanceReport);
router.delete("/:id", attendanceReportsController.deleteAttendanceReport);

module.exports = router;
