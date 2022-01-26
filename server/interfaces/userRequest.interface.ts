import { Request } from 'express';
import IUser from './user.interface';

export default interface IUserRequest extends Request {
  user?: IUser;
}
