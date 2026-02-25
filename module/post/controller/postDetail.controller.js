import { StatusCodes } from "http-status-codes";
import prisma from "../../../lib/prisma.js";
const postDetailsFun = async (req, res) => {
  try {
    const body = req.body;

    const postDetails = await prisma.postDetail.create({
      data: {
        ...body,
        size: parseFloat(body.size),
        school: parseFloat(body.school),
        bus: parseFloat(body.bus),
        restaurant: parseFloat(body.restaurant),
        postId: body.postId,
      },
    });
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Post details created", postDetails });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error in post details", error: error.message });
  }
};
export default postDetailsFun;
