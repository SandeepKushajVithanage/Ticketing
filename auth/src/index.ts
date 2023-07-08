import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/errorHandler";
import routes from "./routes";
import NotFoundError from "./errors/notFoundError";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({ signed: false, secure: true }));

app.use("/api/users", routes);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  console.log("Starting up...", process.env.JWT_KEY);

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
        console.log("Listening on port 3000");
      });
    });
};

start();
