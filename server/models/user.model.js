const mongoose = require('../db');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  role: {
    type: String,
    required: false
  },
  teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: false
  },
  location: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false,
    default: ""
  }
});

module.exports = mongoose.model('User', userSchema);

