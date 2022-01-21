const User = require("../models/model.user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
const JWT_SECRET = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
  try {
    const exists = await User.findOne({ username: req.body.username });
    console.log(exists);
    if (exists) throw new Error("User already exists");
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      parseInt(SALT_ROUNDS)
    );
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    console.log(newUser);
    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(409).send({ error: "409", message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    const isValidPassword = bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error();
    const accessToken = jwt.sign({ username }, JWT_SECRET);
    res.status(200).send({ accessToken });
  } catch (error) {
    console.error("Log in failed", error);
    res
      .status(403)
      .send({ error: "403", message: "Email or password is incorrect" });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const { username } = req.user;
    const { location } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { location },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(409).send({ error: "409", message: error.message });
  }
};

exports.showUserProfile = async (req, res) => {
  const userInfo = {
    ...req.user._doc,
  };
  delete userInfo.password;
  res.status(200).send(userInfo);
};

exports.getAllUsers = async (req, res) => {
  try {
    const foundUsers = await User.find({
      team: req.user.team,
    });
    res.status(200).send(foundUsers);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "400", message: "Error retrieving users" });
  }
};

exports.addTask = async (req, res) => {
  try {
    const { username } = req.user;
    const updates = req.body;
    const updated = await User.updateOne(
      { username: username },
      { $push: { tasks: updates.tasks } }
    );
    console.log(updates);
    res.send(updated);
    res.status(200);
  } catch (error) {
    res.sendStatus(404);
    console.log(error);
  }
};
