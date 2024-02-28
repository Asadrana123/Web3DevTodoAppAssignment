import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoute";
import taskRouter from "./routes/taskRoute";
import forgotPasswordRouter from "./routes/forgotPassword";

//app config
dotenv.config();
const app: Application = express();
const port: number = parseInt(process.env.PORT!) || 8001;

//middlewares
app.use(express.json());
app.use(cors());

//db config
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("MongoDB connected with server");
  })
  .catch((err: Error) => {
    console.error(err);
  });

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/forgotPassword", forgotPasswordRouter);

//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));

