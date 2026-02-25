import { StatusCodes } from "http-status-codes";
import prisma from "../../../lib/prisma.js";
const readChatFun = async (req, res) => {
  try {
    const tokenUserId = req.user.id;
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

export default readChatFun;
