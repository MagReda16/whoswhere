const Team = require('../models/team.model');
const Task = require('../models/task.model');

exports.addTask = async (req, res) => {
  try {
    const team = await Team.findOne({
      _id: req.user.teamId
    });
    const task = await Task.create({
      task: req.body.task,
      team: req.user.teamId,
    });
    team.tasks.push(task._id);
    await team.save();
    res.status(201).send(task);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
};