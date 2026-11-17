const { Router } = require("express");

const authenticate = require("../middleware/authenticate.js");
const visitorsController = require("../controller/visitors-controllers.js");

const router = Router();

router.use(authenticate);

router.get("/", visitorsController.findAllVisitors);
router.get("/:id", visitorsController.findVisitorById);
router.post("/", visitorsController.createVisitor);
router.put("/:id", visitorsController.updateVisitor);
router.delete("/id", visitorsController.deleteVisitor);

module.export = router;
