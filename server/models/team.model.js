const mongoose = require('../db');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task'
    }
  ]
});

module.exports = mongoose.model("Team", teamSchema)