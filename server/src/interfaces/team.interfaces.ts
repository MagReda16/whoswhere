import { Document } from 'mongoose';
import ITask from './task.interface';
import IUser from './user.interface';

export default interface ITeam extends Document {
  name: string;
  members: IUser[];
  tasks: ITask[];
}
