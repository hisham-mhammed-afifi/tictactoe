import User from "../models/User";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors";
import { UserRequest } from "../middlewares/authentication";
import Match from "../models/Match";

export class UserController {
  constructor() {}

  async signup(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const alreadyExist = await User.findOne({ email });

    if (alreadyExist) {
      throw new BadRequestError("email already exist");
    }

    const user = await User.create({ name, email, password });

    return res.status(201).json(true);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Plz provide email & password");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const passwordCorrect = await user.comparePassword(password);

    if (!passwordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const { name, _id } = user;

    const accessToken = jwt.sign(
      { name, _id },
      process.env.JWT_SECRET || "123"
    );

    return res.status(200).json({ accessToken });
  }

  async profile(req: Request, res: Response): Promise<Response> {
    const user = (req as UserRequest).user;

    if (!user) {
      throw new UnauthenticatedError("Unauthenticated");
    }

    const matches = await Match.find({
      $or: [{ firstPlayerId: user._id }, { secondPlayerId: user._id }],
    });

    return res.status(200).json({ user, matches });
  }
}
