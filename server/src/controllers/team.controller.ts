import { Response } from 'express';
import Team from '../models/team.model';
import ITeam from '../../interfaces/team.interfaces';
import UserRequest from '../../interfaces/userRequest.interface';

export const getTeam = async (
  req: UserRequest,
  res: Response
): Promise<void> => {
  try {
    const team: ITeam = await Team.findOne({
      _id: req.user.teamId,
    })
      .populate('members')
      .populate('tasks');
    res.status(200).send(team);
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: '400', message: 'Error retrieving team' });
  }
};
