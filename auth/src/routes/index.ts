import express from "express";
import { signupValidation } from "../middlewares/signup";
import { validationHandler } from "../middlewares/validation";
import { signupController } from "../controllers/signup";

const router = express.Router();

router.post("/signup", signupValidation, validationHandler, signupController);

router.post("/signin", (req, res, next) => {
  res.send("Hello");
});

router.post("/signout", (req, res) => {
  res.send("Hi");
});

export default router;
