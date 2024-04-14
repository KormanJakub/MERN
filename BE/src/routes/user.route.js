const express = require("express");
const publicController = require("../controllers/user.controller");

const router = express.Router();

router.post("/signUp", publicController.singUp);
router.post("/signIn", publicController.singIn);

module.exports = router;
