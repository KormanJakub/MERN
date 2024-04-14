const { body, validationResult } = require("express-validator");
const articleModel = require("../models/article.model");

const getAllArticles = async (req, res) => {
    const records = await articleModel.find();
    res.send(records);
};

/*
const getArticlesOfUser = async(req, res) = {

};

const getSpecificArticle = async(req, res) = {

};
*/

const createArticle = [
    body("name")
        .not()
        .isEmpty()
        .withMessage("Názov článku nesmie byť prázdny."),

    body("text")
        .not()
        .isEmpty()
        .withMessage("Text nesmie byť prázdny."),

    async (req, res) => {
        checkValidation(validationResult(req));

        const { name, text } = req.body;
        const record = new articleModel({
            name,
            text,
            userName: req.user.userName,
            userId: req.user.userId,
            publicationTime: Date.now(),
        });

        try {
            await record.save();
        } catch (error) {
            throw new HttpError(`Database error: ${error.message}`, 500);
        }

        res.status(201).send(record);
    }
];

/*

*/

module.exports = {
    getAllArticles,
    createArticle,
};
