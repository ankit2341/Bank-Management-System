const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Model/Users.model");
const jwt_decode = require("jwt-decode");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(404).send({ msg: "404 error" });
  }
});

userRouter.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const users = await UserModel.find({ email });
    if (users.length > 0) {
      res.status(200).send({ msg: "already registered" });
    } else {
      bcrypt.hash(password, 5, async (err, secured_pass) => {
        if (err) {
          res.status(404).send({ msg: "failed to register" });
        } else {
          const user = new UserModel({
            email,
            password: secured_pass,
            role,
          });
          await user.save();
          res.send({ msg: "registered" });
        }
      });
    }
  } catch (err) {
    res.status(404).send({ msg: "404 error" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    const hashed_pass = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hashed_pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ course: "backend" }, process.env.secret);
          res.status(200).send({
            msg: "logged in",
            token: token,
            username: user[0].email,
            id: user[0]._id,
          });
        } else {
          res.status(404).send({ msg: "wrongcred" });
        }
      });
    } else {
      res.status(200).send({ msg: "newuser" });
    }
  } catch (err) {
    res.status(404).send({ msg: "404 error" });
  }
});

module.exports = {
  userRouter,
};
