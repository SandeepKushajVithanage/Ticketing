import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import BadRequestError from "../errors/badRequestError";

export const signupController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new BadRequestError("Email is already in use");

  const user = User.build({ email, password });
  await user.save();

  const userJwt = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY!
  );

  req.session = { jwt: userJwt };

  res.status(201).send(user);
};
