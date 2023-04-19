import { Request, Response } from "express";
import DatabaseConnectionError from "../errors/databaseConnectionError";
export const signupController = (req: Request, res: Response) => {
  const { email, password } = req.body;
  throw new DatabaseConnectionError();
  res.send({ email, password });
};
