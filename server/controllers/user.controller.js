const User = require("../models/user.model");
const Team = require('../models/team.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
const JWT_SECRET = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
  try {
    const exists = await User.findOne({ username: req.body.username });
    // console.log(exists);
    if (exists) throw new Error("User already exists");
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      parseInt(SALT_ROUNDS)
    );
    let existingTeam = await Team.findOne({ team: req.body.team });
    if (!existingTeam) {
      existingTeam = await Team.create({
        name: req.body.team,
      })
    }
    const newUser = await User.create({
      ...req.body,
      teamId: existingTeam._id,
      password: hashedPassword,
    });
    // await Team.updateOne({
    //   _id: newUser.teamId
    // }, {
    //   $push: { members: newUser._id }
    // });
    existingTeam.members.push(newUser._id);
    await existingTeam.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(409).send({ error: "409", message: error.message });
  }
};

exports.getUser = async (req, res) => {
  const userInfo = {
    ...req.user._doc,
  };
  delete userInfo.password;
  res.status(200).send(userInfo);
};

exports.getTeamUsers = async (req, res) => {
  try {
    const foundTeam = await Team.findOne({
      _id: req.user.teamId,
    }).populate('members').populate('tasks');
    res.status(200).send(foundTeam);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "400", message: "Error retrieving users" });
  }
};

exports.addTask = async (req, res) => {
  try {
    const { username } = req.user;
    const updates = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { $push: { tasks: updates.tasks } },
      { new: true }
    );
    // console.log(updatedUser);
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send({ erorr: "500", message: "Internal Server Error" });
  }
};
