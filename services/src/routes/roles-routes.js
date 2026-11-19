const { Router } = require("express");

const authenticate = require("../middleware/authenticate.js");
const roleController = require("../controller/role-contoller.js");

const router = Router();

router.use(authenticate);

router.get("/", roleController.findAllRoles);
router.get("/", roleController.findRoleByName);
router.get("/", roleController.findRoleById);
router.post("/", roleController.createRole);
router.put("/", roleController.updateRole);
router.delete("/", roleController.deleteRole);

module.export = router;
