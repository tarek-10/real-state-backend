import { StatusCodes } from "http-status-codes";
import prisma from "../../../lib/prisma.js";
const savePostFun = async (req, res) => {
  try {
    const tokenUserId = req.user.id;

    console.log(tokenUserId);
    const postId = req.body.postId;

    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });
    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      res
        .status(StatusCodes.OK)
        .json({ message: "Post removed from saved list" });
    } else {
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId,
        },
      });
      res.status(StatusCodes.OK).json({ message: "Post saved" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error..!" });
  }
};
export default savePostFun;
