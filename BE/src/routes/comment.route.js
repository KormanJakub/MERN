const express = require("express");
const commentController = require("../controllers/comment.controller");

const router = express.Router();

router.post("/create", commentController.create);

router.put("/update/:id", commentController.update);

router.delete("/delete/:id", commentController.remove);

module.exports = router;
