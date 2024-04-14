const { body, validationResult } = require("express-validator");
const { checkValidation } = require("../util/helper");
const jwt = require("jsonwebtoken");
const HttpError = require("../util/HttpError");
const userModel = require("../models/user.model");

const singUp = [
  body("nickName")
    .not()
    .isEmpty()
    .isLength({ min: 4 })
    .withMessage("Je potrebné zadať nickname. Minimálne 4 písmena musí byť dĺžka."),

  body("email")
    .isEmail()
    .withMessage("Neplatný email."),

  body("password")
    .not()
    .isEmpty()
    .withMessage("Heslo nemôže byť prázdne"),

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
    const { nickName, email, password, password_repeat, firstName, lastName } = req.body;

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
      lastName: record.lastName 
    });
  },
];

const singIn = [
  body("email")
    .isEmail()
    .withMessage("Neplatný email"),

  body("nickname")
    .isEmpty()
    .withMessage("Neplatný nickname"),

  body("password")
    .not()
    .isEmpty()
    .withMessage("Heslo nemôže byť prázdne"),

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
        userName: existingUser.name,
      },
      process.env.API_KEY
    );
    res.send({ token });
  },
];

module.exports = {
  singUp,
  singIn,
};
