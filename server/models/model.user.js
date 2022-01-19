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
  team: {
      type: String,
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
  },
  tasks : {
    type: [ String ],
    required: false
  }
});



module.exports = mongoose.model('user', userSchema);

