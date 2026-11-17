const { Router } = require("express");

const authenticate = require("../middleware/authenticate.js");
const accountsController = require("../controller/accounts-controller.js");

const router = Router();

router.use(authenticate);

router.get("/", accountsController.findAllAccounts);
router.get("/:id", accountsController.findAccountById);
router.get("/:username", accountsController.findAccountByUsername);
router.post("/", accountsController.createAccount);
router.put("/:id", accountsController.updateAccount);
router.delete("/:id", accountsController.deleteAccount);

module.exports = router;
