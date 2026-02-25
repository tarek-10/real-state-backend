import { StatusCodes } from "http-status-codes";
import prisma from "../../../lib/prisma.js";

const getALLPostsFun = async (req, res) => {
  try {
    const query = req.query;

    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: query.bedroom ? parseInt(query.bedroom) : undefined,
        price: {
          gte: query.minPrice ? parseInt(query.minPrice) : undefined,
          lte: query.maxPrice ? parseInt(query.maxPrice) : undefined,
        },
      },
    });

    res.status(StatusCodes.OK).json(posts);
  } catch (err) {
    console.log("SERVER ERROR:", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to get posts" });
  }
};

export default getALLPostsFun;
