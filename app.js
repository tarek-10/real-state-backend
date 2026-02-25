import express from "express";
import dotenv from "dotenv";
import {
  chatRouter,
  messageRouter,
  postRouter,
  userRouter,
} from "./router/app.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use("/api/auth", userRouter);
app.use("/api/post", postRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.listen(port, () => {
  console.log(`app listening successfully at port ${port}`);
});
