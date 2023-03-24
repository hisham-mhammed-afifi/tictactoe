import { UnauthenticatedError, UnauthorizedError } from "../errors";
import jwt from "jsonwebtoken";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../models/User";

export interface UserRequest extends Request {
  user: User;
}

export const authenticate: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const Authorization = req.header("Authorization") || "";

  try {
    const bearer = Authorization.split(" ");
    if (bearer[0] !== "Bearer") {
      throw Error();
    }
    const token = bearer[1];
    const user = jwt.verify(token, process.env.JWT_SECRET || "123") as User;
    (req as UserRequest).user = user;
    return next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export const authorize = (...roles: string[]) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};
