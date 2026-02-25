import { StatusCodes } from "http-status-codes";
import prisma from "../../../lib/prisma.js";

const getUsersFun = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    res.status(StatusCodes.OK).json({ message: "Users retrieved", users });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error getting users", error: error.message });
  }
};

export default getUsersFun;
