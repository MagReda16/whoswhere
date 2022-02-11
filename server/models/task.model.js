const mongoose = require('../db');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  task: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Task", taskSchema)