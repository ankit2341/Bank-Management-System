const express = require("express");
const { auth } = require("../Middlewares/Authorization");

const { AccountModel } = require("../model/Accounts.model");
const accountRouter = express.Router();

accountRouter.get("/", async (req, res) => {
  try {
    const events = await AccountModel.find();
    res.status(200).send(events);
  } catch (err) {
    res.status(404).send({ msg: "404 error" });
  }
});

accountRouter.get("/:event_id", async (req, res) => {
  const id = req.params.event_id;
  try {
    const events = await AccountModel.find({ _id: id });
    res.status(200).send(events);
  } catch (err) {
    res.status(404).send({ msg: "404 error" });
  }
});

//   accountRouter.use(auth);

accountRouter.post("/", async (req, res) => {
  const body = req.body;
  try {
    const events = new AccountModel(body);
    await events.save();
    res.status(200).send({ msg: "event added" });
  } catch (err) {
    res.status(404).send({ msg: "404 error" });
  }
});

accountRouter.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  try {
    await AccountModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).send({ msg: "updated" });
  } catch (err) {
    res.status(404).send({ msg: "404 eror" });
  }
});

module.exports = {
  accountRouter,
};
