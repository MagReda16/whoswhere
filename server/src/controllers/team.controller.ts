import { Request, Response } from 'express';
import Team from '../models/team.model';
import ITeam from '../interfaces/team.interfaces';
import IUserRequest from '../interfaces/userRequest.interface';

export const getTeam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // if (!req.user) throw new Error();
    const team = await Team.findOne({
      _id: req.body.user.teamId,
    })
      .populate('members')
      .populate('tasks');
    if (!team) throw new Error();
    res.status(200).send(team);
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: '400', message: 'Error retrieving team' });
  }
};
