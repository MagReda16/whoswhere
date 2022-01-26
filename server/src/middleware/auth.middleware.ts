import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import IUserRequest from '../../interfaces/userRequest.interface';
import IUser from '../../interfaces/user.interface';

const JWT_SECRET: string = process.env.JWT_SECRET;

const authMiddleware = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorization: string = req.headers.authorization;
    if (!authorization) throw new Error();
    const accessToken: string = authorization.split(' ')[1];
    const { username }: { username: string } = jwt.verify(
      accessToken,
      JWT_SECRET
    );
    const user: IUser = await User.findOne({ username });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send({ error: '403', message: 'Unauthorized request' });
  }
};

export default authMiddleware;
