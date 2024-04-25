const express = require("express");
const articleController = require("../controllers/article.controller");

const router = express.Router();

router.get("/getAllArticles", articleController.getAllArticles);
router.get("/getArticleByUser", articleController.getArticleByUser);
router.get("/getArticleById/:id", articleController.getArticleById);

router.post("/createArticle", articleController.createArticle);

router.put("/updateArticle/:id", articleController.update);

router.delete("/removeArticle/:id", articleController.remove);


module.exports = router;