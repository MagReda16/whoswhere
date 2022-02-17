import { Request, Response } from 'express';
import IUserRequest from '../interfaces/userRequest.interface';
import Task from '../models/task.model';
import Team from '../models/team.model';
import ITeam from '../interfaces/team.interfaces';
import ITask from '../interfaces/task.interface';

export const addTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const team = await Team.findOne({
      _id: req.body.user.teamId,
    });
    if (!team) throw new Error()
    const task: ITask = await Task.create({
      task: req.body.task,
      due: req.body.due,
      urgent: req.body.urgent,
      veryUrgent: req.body.veryUrgent,
      team: req.body.user.teamId,
    });
    team.tasks.push(task._id);
    await team.save();
    res.status(201).send(task);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
};
