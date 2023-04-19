import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.post("/api/users/signin", (req, res, next) => {
  mongoose
    .connect("mongodb://auth-mongo-srv:27017/auth")
    .then(() => {
      res.send("Connected to database");
    })
    .catch(next);
  // res.send("Hello");
});

export { router as signinRouter };
