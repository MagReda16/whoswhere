const mongoose = require('../db');
// const uniqueValidator = require('mongoose-unique-validator');

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
      type: [mongoose.Types.ObjectId],
      ref: 'team',
      required: false
  },
  savedLocations: {
    type: [ String ],
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

// userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('user', userSchema);


//for current location and location, possibly remove required: 'true'-- will default to false
//possibly add picture: 
  //image: {
  //   type: String,
  //   required: false,
  //   default: (link to default profle img)
  //    
  // }

  //can include timestamps: true to keep track within database of users update to location