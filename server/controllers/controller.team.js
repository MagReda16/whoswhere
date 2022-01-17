const mongoose = require('mongoose');
const Team = require('../models/model.team');
const { findById } = require('../models/model.user');
const User = require('../models/model.user');


exports.createNewTeam = async (req, res) => {
      const { title, members, owner } = req.body;
      const newTeam = new Team({
        title,
        members,
        owner
    });
    let user;
    try {
      user = await (await User.findById(owner))
    } catch (error) {
      res.sendStatus(500)
      console.log('Creating team failed')
    }
    if (!user) {
      res.sendStatus(404)
      console.log('Could not find user for provided ID')
    }
    // console.log(user);
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await newTeam.save({ session: sess });
      user.team.push(newTeam);
      await user.save({ session: sess });
      await sess.commitTransaction();
    } catch (error) {
      res.sendStatus(500);
      console.log(error);
    }
    res.status(201).send({ team: newTeam })
    console.log(newTeam);
};


exports.addTeamMember = async (req, res) => {
try {
    const newMem = await User.findById(req.body.id);
    const teamToAdd = await Team.findOne( {title: req.body.title} );
    console.log(teamToAdd)
    await teamToAdd.members.push(newMem)
    await teamToAdd.save();
    res.status(201)
    res.send(newMem);
} catch (error) {
  res.sendStatus(500)
  console.log(error);
}

//refactor this garbage pile 
};

exports.showMyTeam = async (req, res) => {
  try {
    // const allTeams = await Team.find({});
    const myTeam = await Team.findById(req.body.id)

    //const myTeam = await Team.findById(req.body.team[0]) <--get team from entire user obj??
    //does this make more sense if showing team from users page?
    res.send(myTeam);
    res.status(200);
    console.log(myTeam);
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
};
 
exports.getAllTeams =  async (req, res) => {
  try {
     const allTeams = await Team.find({}) 
     res.send(allTeams);
     console.log(allTeams)
     res.status(200)
  } catch (error) {
    console.log(error)
    res.status(400)
  }
};

exports.deleteTeam = async (req, res) => {
  const teamId = req.params.id;
  let team;
  try {
    team = await Team.findById(teamId).populate('owner')
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

  if (!team) {
    res.sendStatus(404)
    console.log('Could not find team matching ID')
  }
  
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await team.remove( {session:sess} );
    team.owner.team.pull(team);
    await team.owner.save( {session:sess} );
    await sess.commitTransaction();
  } catch(error) {
    console.log(error)
    res.sendStatus(500);
  }
  
  res.status(200).send( {message: 'Deleted successfully'} )

};