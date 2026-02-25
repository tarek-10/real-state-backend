import { StatusCodes } from "http-status-codes";
import prisma from "../../../lib/prisma.js";

const addChatFun = async (req, res) => {
  try {
    const tokenuserID = req.user.id;
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenuserID, req.body.receiverId],
      },
    });
    res.status(StatusCodes.CREATED).json(newChat);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

export default addChatFun;
