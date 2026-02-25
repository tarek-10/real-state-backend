import { StatusCodes } from "http-status-codes";
import prisma from "../../../lib/prisma.js";

const getChatsFun = async (req, res) => {
  try {
    const tokenUserID = req.user.id;
    console.log(tokenUserID);

    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserID],
        },
      },
    });
    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id !== tokenUserID);

      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.receiver = receiver;
    }

    res.status(StatusCodes.OK).json(chats);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};
export default getChatsFun;
