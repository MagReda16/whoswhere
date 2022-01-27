import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import IUserRequest from '../interfaces/userRequest.interface';
import IUser from '../interfaces/user.interface';


const JWT_SECRET: string = process.env.JWT_SECRET!;


declare module "jsonwebtoken" {
  export interface JwtPayload {
      userId: string;
  }
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) throw new Error();
    const accessToken: string = authorization.split(' ')[1];
    const { userId } = <jwt.JwtPayload>jwt.verify(accessToken, JWT_SECRET);
    const user = await User.findOne({ _id: userId });
    if (!user) throw new Error();
    req.body.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send({ error: '403', message: 'Unauthorized request' });
  }
};

export default authMiddleware;
