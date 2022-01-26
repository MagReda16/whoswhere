import { Request, Response } from 'express';
import User from '../models/user.model';
import Team from '../models/team.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import IUser from '../../interfaces/user.interface';
import ITeam from '../../interfaces/team.interfaces';
import IUserRequest from '../../interfaces/userRequest.interface';

const SALT_ROUNDS: number = parseInt(process.env.SALT_ROUNDS);
const JWT_SECRET: string = process.env.JWT_SECRET;

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const existingUser: IUser = await User.findOne({
      username: req.body.username,
    });
    if (existingUser) throw new Error('Username already exists');
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    let existingTeam: ITeam = await Team.findOne({ name: req.body.team });
    if (!existingTeam) {
      existingTeam = await Team.create({
        name: req.body.team,
      });
    }
    const newUser: IUser = await User.create({
      ...req.body,
      teamId: existingTeam._id,
      password: hashedPassword,
    });
    existingTeam.members.push(newUser._id);
    await existingTeam.save();
    res.status(201).send(newUser);
  } catch (e) {
    console.error(e);
    res.status(409).send({ error: '409', message: e.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password }: { username: string; password: string } =
      req.body;
    const user: IUser = await User.findOne({ username: username });
    if (!user) throw new Error('Email or password is incorrect');
    const isValidPassword: boolean = await bcrypt.compare(
      password,
      user.password
    );
    if (!isValidPassword) throw new Error('Email or password is incorrect');
    const accessToken: string = jwt.sign({ username }, JWT_SECRET);
    res.status(200).send({ accessToken });
  } catch (e) {
    console.error(e);
    res.status(403).send({ error: '403', message: e.message });
  }
};

export const updateLocation = async (
  req: IUserRequest,
  res: Response
): Promise<void> => {
  try {
    const { username } = req.user;
    const { location }: { location: string } = req.body;
    const updatedUser: IUser = await User.findOneAndUpdate(
      { username },
      { location },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (e) {
    console.error(e);
    res.status(409).send({ error: '409', message: e.message });
  }
};

export const getUser = async (
  req: IUserRequest,
  res: Response
): Promise<void> => {
  res.status(200).send(req.user);
};
