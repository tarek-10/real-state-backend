import { StatusCodes } from "http-status-codes";
import prisma from "../../../lib/prisma.js";
const profilePostsFun = async (req, res) => {
  try {
    const tokenUserId = req.user.id;
    console.log(tokenUserId);
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    });
    const saved = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        post: true,
      },
    });

    const savedPosts = saved.map((item) => item.post);
    res.status(200).json({ userPosts, savedPosts });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};
export default profilePostsFun;
