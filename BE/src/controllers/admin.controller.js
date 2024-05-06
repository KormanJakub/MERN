const HttpError = require("../util/HttpError");
const userModel = require("../models/user.model");
const { body, validationResult, matchedData } = require("express-validator");
const { checkValidation } = require("../util/helper");

const getAllUsers = async (req, res) => {
  const records = await userModel.find();
  res.send(records);
};

const createUser = [
  body("nickName")
    .not()
    .isEmpty()
    .isLength({ min: 4 })
    .withMessage(
      "Je potrebné zadať nickname. Minimálne 4 písmena musí byť dĺžka."
    ),

  body("email").isEmail().withMessage("Neplatný email."),

  body("password").not().isEmpty().withMessage("Heslo nemôže byť prázdne"),

  body("password")
    .matches(/[0-9]/)
    .withMessage("Heslo musí obsahovať aspoň jedno číslo"),

  body("password")
    .matches(/[a-z]/)
    .withMessage("Heslo musí obsahovať aspoň jeden malý znak"),

  body("password")
    .matches(/[A-Z]/)
    .withMessage("Heslo musí obsahovať aspoň jeden veľký znak"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Heslo musí mať minimálne 8 znakov"),

  body("password_repeat")
    .not()
    .isEmpty()
    .withMessage("Heslo nemôže byť prázdne"),

  async (req, res) => {
    checkValidation(validationResult(req));
    const { nickName, email, password, password_repeat, firstName, lastName } =
      req.body;

    const existingUserByEmail = await userModel.findOne({ email });
    const existingUserByNickname = await userModel.findOne({ nickName });

    if (existingUserByEmail) {
      throw new HttpError("Email is in use", 400);
    }

    if (existingUserByNickname) {
      throw new HttpError("Nickname is already used", 400);
    }

    if (password !== password_repeat) {
      throw new HttpError("Passwords do not match", 400);
    }

    const record = new userModel({ nickName, email, firstName, lastName });
    record.setPassword(password);
    await record.save();

    res.status(201).send({
      email: record.email,
      nickName: record.nickName,
      firstName: record.firstName,
      lastName: record.lastName,
    });
  },
];

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
    const matched = matchedData(req, {
      onlyValidData: true,
    });

    const record = await userModel.findById(req.params.id);

    if (!record) {
      throw new HttpError("User not found", 404);
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
    res.send({ record });
  },
];

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  createUser
};
