import { NextFunction, Request, Response } from "express";
import RequestValidationError from "../errors/requestValidationErrors";
import DatabaseConnectionError from "../errors/databaseConnectionError";
import CustomError from "../errors/customError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Something went wrong", err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [{ message: err.message }],
  });
};
