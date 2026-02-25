import { StatusCodes } from "http-status-codes";
import prisma from "../../../lib/prisma.js";
import jwt from "jsonwebtoken";
const deletePostFun = async (req, res) => {
  try {
    const tokenData = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(tokenData, process.env.privateKey);
    const userId = decodedToken.id;
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (post) {
      if (post.userId !== userId) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "You are not authorized to delete this post" });
      }
    }
    const deletedPost = await prisma.post.delete({
      where: { id },
    });
    res.status(StatusCodes.OK).json({ message: "Post deleted", deletedPost });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error deleting post", error: error.message });
  }
};
export default deletePostFun;
