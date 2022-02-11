const Team = require("../models/team.model");

exports.getTeam = async (req, res) => {
  try {
    // console.log(req.user);

    const team = await Team.findOne({
      _id: req.user.teamId,
    })
      .populate("members")
      .populate("tasks");
    res.status(200).send(team);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "400", message: "Error retrieving team" });
  }
};
