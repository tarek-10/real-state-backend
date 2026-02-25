import { StatusCodes } from "http-status-codes";
import prisma from "../../../lib/prisma.js";
import jwt from "jsonwebtoken";
const getPostByIdFun = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
          res
            .status(StatusCodes.OK)
            .json({ ...post, isSaved: saved ? true : false });
        }
      });
    }
    res.status(StatusCodes.OK).json({ ...post, isSaved: false });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to get post" });
  }
};

export default getPostByIdFun;
