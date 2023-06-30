import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import hotelsRoutes from "./routes/hotels.js";
import roomsRoutes from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/rooms", roomsRoutes);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong.";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

mongoose
  .connect(process.env.MONGO)
  .then((result) => {
    console.log("Database Connected.");
    app.listen(8800);
    console.log("Server Running.");
  })
  .catch((err) => {
    console.log(err);
  });
