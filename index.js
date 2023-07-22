import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", (req, res, next) => {
  try {
    res.status(200).json({ message: "Working fine" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
app.listen(7000, () => {
  connect();
  console.log("Connected to port 7000");
});
