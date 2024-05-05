const { body, validationResult, matchedData } = require("express-validator");
const articleModel = require("../models/article.model");
const HttpError = require("../util/HttpError");
const { checkValidation } = require("../util/helper");
const commentModel = require("../models/comment.model");

const create = [
  body("text")
    .not()
    .isEmpty(),

  async (req, res) => {

    checkValidation(validationResult(req));
    const { text, art_id } = req.body;
    const article = await articleModel.findOne({ _id: art_id });

    if (!article) {
      throw new HttpError("Article is not valid!", 404);
    }

    const record = new commentModel({
      text,
      articleName: article.name,
      articleId: art_id,
      commentatorName: req.user.userName,
      commentatorId: req.user.userId,
    });
    
    try {
      await record.save();
    } catch (error) {
      throw new HttpError(`Database error: ${error.message} ${req.user.commentatorId}`, 500);
    }
    res.status(201).send(record);
  },
];

const update = [
  body("text")
    .optional(),

  async (req, res) => {
    checkValidation(validationResult(req));
    const matched = matchedData(req, {
      onlyValidData: true,
    });
    const record = await commentModel.findById(req.params.id);
    if (!record) {
      throw new HttpError("Comment does not exists!", 404);
    }
    for (const key in matched) {
      if (matched[key] !== undefined) {
        record[key] = matched[key];
      }
    }
    try {
      await record.save();
    } catch (error) {
      throw new HttpError(`Database error: ${error.message}`, 500);
    }
    res.send({});
  },
];

//DELETE
const remove = async (req, res) => {
  try {
    await commentModel.findByIdAndDelete(req.params.id);
  } catch (error) {
    throw new HttpError(`Database error: ${error.message}`, 500);
  }
res.send({});
};

module.exports = {
  create,
  update,
  remove
};
