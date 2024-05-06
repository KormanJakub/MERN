const HttpError = require("../util/HttpError");
const userModel = require("../models/user.model");
const { body, validationResult, matchedData } = require("express-validator");

const getAllUsers = async (req, res) => {
  const records = await userModel.find();
  res.send(records);
};

const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
  } catch (error) {
    throw new HttpError(`Database error: ${error.message}`, 500);
  }
  res.send({});
};

const updateUser = [
  body("nickName").optional(),
  body("email").optional(),
  body("firstName").optional(),
  body("lastName").optional(),

  async (req, res) => {
    checkValidation(validationResult(req));

    const record = await userModel.findById(req.params.id);

    if (!record) {
      throw new HttpError("User not found", 404);
    }

    try {
      await record.save();
    } catch (error) {
      throw new HttpError(`Database error: ${error.message}`, 500);
    }
    res.send({});
  },
];

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
};
