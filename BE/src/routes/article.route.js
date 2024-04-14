const express = require("express");
const articleController = require("../controllers/article.controller");

const router = express.Router();

router.get("/getAllArticles", articleController.getAllArticles);
router.post("/createArticle", articleController.createArticle);
router.get("/getArticleByUserId", articleController.getArticleByUserId);

module.exports = router;