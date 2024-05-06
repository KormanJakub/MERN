const { body, validationResult, matchedData } = require("express-validator");
const multer = require("multer");

const articleModel = require("../models/article.model");
const { checkValidation } = require("../util/helper");
const commentModel = require("../models/comment.model");
const HttpError = require("../util/HttpError");

const { fileFilter, storage } = require("../util/fileUpload");

let upload = multer({ storage, fileFilter, limits: { fileSize: "10MB" } });

const getAllArticles = async (req, res) => {
  const records = await articleModel.find();
  res.send(records);
}; //FUNGUJE

const getArticleById = async (req, res) => {
  const record = await articleModel.findById(req.params.id);

  if (!record) {
    throw new HttpError("Article not found", 500);
  }

  const comments = await commentModel.find({
    articleId: req.params.id,
  });

  res.send({ record, comments });
}; //FUNGUJE

const getArticleByUser = async (req, res) => {
  const records = await articleModel.find({ userId: req.user.userId });
  res.send(records);
}; //FUNGUJE ALE TREBA OTESTOVAŤ

const createArticle = [
  upload.single("image"),
  body("name").not().isEmpty().withMessage("Názov článku nesmie byť prázdny."),

  body("text").not().isEmpty().withMessage("Text nesmie byť prázdny."),

  async (req, res) => {
    checkValidation(validationResult(req));

    const { name, text } = req.body;
    
    /*
    let imageLocation = "";
    if (req.file.path) {
      imageLocation = req.file.path.substr(req.file.path.indexOf("/") + 1);
    }
    */
   
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
  },
]; //FUNGUJE

const update = [
  body("name").optional(),
  body("text").optional(),

  async (req, res) => {
    checkValidation(validationResult(req));
    const matched = matchedData(req, {
      onlyValidData: true,
    });

    const record = await articleModel.findById(req.params.id);
    if (!record) {
      throw new HttpError("Article does not exists!", 404);
    }

    for (const key in matched) {
      if (matched[key] !== undefined) {
        if (key === "address") {
          for (const akey in matched[key]) {
            record[key][akey] = matched[key][akey];
          }
          record.markModified("address");
        } else {
          record[key] = matched[key];
        }
      }
    }
    try {
      await record.save();
    } catch (error) {
      throw new HttpError(`Database error: ${error.message}`, 500);
    }
    res.send({});
  },
]; //FUNGUJE

const remove = async (req, res) => {
  try {
    await articleModel.findByIdAndDelete(req.params.id);
  } catch (error) {
    throw new HttpError(`Database error: ${error.message}`, 500);
  }
  res.status(200).send({});
}; //FUNGUJE

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  getArticleByUser,
  update,
  remove,
};
