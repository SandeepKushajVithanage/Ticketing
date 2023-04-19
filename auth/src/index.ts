import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import { currentUserRouter } from "./routes/currentUser";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/errorHandler";
import NotFoundError from "./errors/notFoundError";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = () => {
  mongoose
    .connect("mongodb://auth-mongo-srv:27017/auth")
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      app.listen(3000, () => {
        console.log("Listening on port 3000!");
      });
    });
};

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
