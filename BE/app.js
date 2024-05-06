const express = require("express");
const { json } = require("body-parser");
const mongoose = require("mongoose");
require("express-async-errors");
require("dotenv").config();

const authMiddleware = require("./src/middlewares/auth.middleware");

if (!process.env.API_KEY) {
  console.log("API_KEY secret is missing!");
  process.exit(1);
}

if (!process.env.mongoURL) {
  console.log("mongoURL not defined!");
  return -1;
}

const app = express();
app.use(json());
app.use(express.static("public"));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-access-token");
  next();
});


app.use(authMiddleware);

app.use("/public", require("./src/routes/public.route"));
app.use("/articles", require("./src/routes/article.route"));
app.use("/admin", require("./src/routes/admin.route"));
app.use("/comments", require("./src/routes/comment.route"));
app.use("/user", require("./src/routes/user.route"));

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

app.use(function (req, res, next) {
  res.status(404).send({ message: "Requesteted page not found!" });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.mongoURL);
  } catch (error) {
    console.error(
      `${error.message}, cannot connect to mongo: ${process.env.mongoURL}, Exiting!`
    );
    return -1;
  }
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};

start();
