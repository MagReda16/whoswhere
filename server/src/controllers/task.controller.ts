import { Response } from 'express';
import UserRequest from '../../interfaces/userRequest.interface';
import Task from '../models/task.model';
import Team from '../models/team.model';
import ITeam from '../../interfaces/team.interfaces';
import ITask from '../../interfaces/task.interface';

export const addTask = async (
  req: UserRequest,
  res: Response
): Promise<void> => {
  try {
    const team: ITeam = await Team.findOne({
      _id: req.user.teamId,
    });
    const task: ITask = await Task.create({
      task: req.body.task,
      team: req.user.teamId,
    });
    team.tasks.push(task._id);
    await team.save();
    res.status(201).send(task);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
};
