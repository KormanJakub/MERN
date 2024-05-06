const express = require("express");
const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.get("/allUsers", adminController.getAllUsers);

router.put("/updateUser/:id", adminController.updateUser);

router.delete("/deleteUser/:id", adminController.deleteUser);

router.post("/createUser", adminController.createUser);

module.exports = router;
