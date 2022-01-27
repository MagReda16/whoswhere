import { Request, Response } from 'express';
import User from '../models/user.model';
import Team from '../models/team.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import IUser from '../interfaces/user.interface';
import ITeam from '../interfaces/team.interfaces';
import IUserRequest from '../interfaces/userRequest.interface';

const JWT_SECRET: string | jwt.Secret = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const existingUser: IUser = await User.findOne({
      username: req.body.username,
    });
    if (existingUser) throw new Error('Username already exists');
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let existingTeam = await Team.findOne({ name: req.body.team });
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
  } catch (e: any) {
    console.error(e);
    res.status(409).send({ error: '409', message: e.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user: IUser = await User.findOne({ username: username });
    if (!user) throw new Error('Email or password is incorrect');
    const isValidPassword: boolean = await bcrypt.compare(
      password,
      user.password
    );
    if (!isValidPassword) throw new Error('Email or password is incorrect');
    const accessToken: string = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(200).send({ accessToken });
  } catch (e: any) {
    console.error(e);
    res.status(403).send({ error: '403', message: e.message });
  }
};

export const updateLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.body.user) throw new Error();
    const { username } = req.body.user;
    const { location }: { location: string } = req.body;
    const updatedUser: IUser = await User.findOneAndUpdate(
      { username },
      { location },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (e: any) {
    console.error(e);
    res.status(409).send({ error: '409', message: e.message });
  }
};

export const getUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.status(200).send(req.body.user);
};
