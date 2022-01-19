const User = require('../models/model.user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const exists = await User.findOne({ username : req.body.username })
    if (exists) {
      throw new Error('User already exists, login');
    } 
    const added = req.body;
    const hashedPassword = await bcrypt.hash(added.password, 10);
    const newUser = new User({
        firstName: added.firstName,
        lastName: added.lastName,
        username: added.username,
        password: hashedPassword,
        team: added.team,
        role: added.role,
        admin: added.admin
    });
      await newUser.save();
      res.status(201);
      res.send(newUser);
  } catch (error) {
      res.sendStatus(500);
      console.log(error);
}
};

exports.updateLocation = async (req, res) => {
  try {
    const {username} = req.user
    const updates = req.body
    const updated = await User.findOneAndUpdate({username: username}, 
      {
      location: updates.location,
    });
    res.send(updated);
    res.status(200);

  } catch (error) {
    res.sendStatus(404);
    console.log(error);
  }
};

exports.logIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username })
    let isValidPassword = bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw new Error();
    }
    const accessToken = jwt.sign({ username }, 'secret');
    res.send({accessToken});
    res.status(200);
    console.log('logged in!')
  } catch (error) {
    console.log(error, 'Log in failed');
    res.status(500);
    res.send(error);
  }
};

exports.showUserProfile = async (req, res) => {
  try {
    const {username}  = req.user;
    let user = await User.findOne({username})
   const info = {
      firstName: user.firstName,
      lastName: user.lastName,
      admin: user.admin,
      role: user.role,
      team: user.team,
      image: user.image,
      location: user.location,
      tasks: user.tasks
    }
    res.status(200).json(info)
 } catch (error) {
   console.log(error)
   res.status(400)
 }
};

exports.getAllUsers =  async (req, res) => {
  try {
     const allUsers = await User.find({}) 
     res.send(allUsers);
     res.status(200)
  } catch (error) {
    console.log(error)
    res.status(400)
  }
};

exports.addTask = async (req, res) => {
  try {
    const { username } = req.user
    const updates = req.body
    const updated = await User.updateOne({username: username}, {$push: {tasks: updates.tasks}});
    console.log(updates);
    res.send(updated);
    res.status(200);
  } catch (error) {
    res.sendStatus(404);
    console.log(error);
  }
}


