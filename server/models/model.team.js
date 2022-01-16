const mongoose = require('../db');
// const { ObjectId } = mongoose.Schema

const Schema = mongoose.Schema;

const teamSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Types.ObjectId, //adminId
    required: true,
    ref: 'user' 
  },
  members: {
    type: [ mongoose.Types.ObjectId ],
    ref: 'user',
    required: false //for now
  }
});

module.exports = mongoose.model('team', teamSchema);


// how to add to team??? :
//   create team schema:
//     members: [ usersSchema ] ??
//     OR
//     team: {
//      title: String,
//      members: {
//        type: ObjectId,
//        ref: "user"
//       }