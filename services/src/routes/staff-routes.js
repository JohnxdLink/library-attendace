const { Router } = require("express");

const authenticate = require("../middleware/authenticate.js");
const staffController = require("../controller/staff-controller.js");

const router = Router();

router.use(authenticate);

router.get("/", staffController.findAllStaffs);
router.get("/:id", staffController.findStaffById);
router.get("/account/:account_id", staffController.findStaffByAccountId);
router.get("/email/:email", staffController.findStaffByEmail);
router.post("/", staffController.createStaff);
router.put("/:id", staffController.updateStaff);
router.delete("/:id", staffController.deleteStaff);

module.export = router;
