import express, { Request, Response } from "express";
import { signupValidation } from "../middlewares/signup";
import { validationHandler } from "../middlewares/validation";
import { signupController } from "../controllers/signup";

const router = express.Router();

router.post(
  "/api/users/signup",
  signupValidation,
  validationHandler,
  signupController
);

export { router as signupRouter };
