const { body, validationResult, matchedData } = require("express-validator");
const { checkValidation } = require("../util/helper");
const jwt = require("jsonwebtoken");
const HttpError = require("../util/HttpError");
const userModel = require("../models/user.model");

const singUp = [
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

const singIn = [
  body("email").isEmail().withMessage("Neplatný email"),

  body("password").not().isEmpty().withMessage("Heslo nemôže byť prázdne"),

  async (req, res) => {
    checkValidation(validationResult(req));
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      throw new HttpError("Invalid credentials!", 400);
    }

    if (!existingUser.checkPassword(password)) {
      throw new HttpError("Invalid credentials!", 400);
    }

    const token = jwt.sign(
      {
        userId: existingUser.id,
        userName: existingUser.nickName,
      },
      process.env.API_KEY
    );

    const role = "admin";

    if (existingUser.role === "admin") {
      res.send({ token, role });
    } else {
      res.send({ token });
    }
  },
];


const updatePassword = [
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

  async (req, res) => {
    checkValidation(validationResult(req));
    const { password } = req.body;

    const matched = matchedData(req, {
      onlyValidData: true,
    });

    const record = await userModel.findById(req.params.id);

    if (!record) {
      throw new HttpError("User not found", 404);
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
      record.setPassword(password);
      await record.save();
    } catch (error) {
      throw new HttpError(`Database error: ${error.message}`, 500);
    }
    res.send({});
  },
];


const getUserById = async (req, res) => {
  const record = await userModel.findById(req.params.id);

  if (!record) {
    throw new HttpError("User not found", 500);
  }

  res.send({record});
};

module.exports = {
  singUp,
  singIn,
  updatePassword,
  getUserById
};
