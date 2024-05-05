const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.put("/updatePassword/:id", userController.updatePassword);
router.get("/getUserById/:id", userController.getUserById);

module.exports = router;