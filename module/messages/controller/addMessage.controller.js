import { StatusCodes } from "http-status-codes";
import prisma from "../../../lib/prisma.js";
const addMessageFun = async (req, res) => {
  try {
    const tokenUserId = req.user.id;
    const chatId = req.params.chatId;
    const text = req.body.text;

    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    if (!chat) return res.status(404).json({ message: "Chat not found!" });

    const message = await prisma.message.create({
      data: {
        text,
        chatId,
        userId: tokenUserId,
      },
    });

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: [tokenUserId],
        lastMessage: text,
      },
    });

    res.status(200).json(message);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "INTERNAL SERVER ERROR" });
  }
};

export default addMessageFun;
