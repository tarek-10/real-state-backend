import { StatusCodes } from "http-status-codes";
import prisma from "../../../lib/prisma.js";
const getNotiFicationFun = async (req, res) => {
  console.log("from nnn");

  const tokenUserId = req.user.id;
  console.log("nnnn", tokenUserId);

  try {
    const number = await prisma.chat.count({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
        NOT: {
          seenBy: {
            hasSome: [tokenUserId],
          },
        },
      },
    });
    res.status(StatusCodes.OK).json(number);
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to get profile posts!" });
  }
};

export default getNotiFicationFun;
