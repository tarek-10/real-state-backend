import { StatusCodes } from "http-status-codes";
import prisma from "../../../lib/prisma.js";

const getUserByIdFun = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(StatusCodes.OK).json({ message: "User retrieved", user });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error getting user", error: error.message });
  }
};
export default getUserByIdFun;
