import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/User.js";
import travelStoryRouter from "./routes/TravelStory.js";
import path from "path";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.DBURL, { dbName: "TravelStory" })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "https://travel-story-virid.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/user", userRouter);
app.use("/travel-story", travelStoryRouter);

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.listen(process.env.PORT, () => console.log("Server is Running"));
