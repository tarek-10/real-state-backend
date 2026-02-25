import { StatusCodes } from "http-status-codes";
import prisma from "../../../lib/prisma.js";
import jwt from "jsonwebtoken";
const verifyFun = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.privateKey);
    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });
    if (user) {
      if (user.isConfirmed == true) {
        res.status(StatusCodes.OK).json({ message: "user already verified" });
      } else {
        const confirmedUser = await prisma.user.update({
          where: { email: user.email },
          data: { isConfirmed: true },
        });
        res
          .status(StatusCodes.OK)
          .json({ message: "user verified successfully", confirmedUser });
      }
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "user not found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
export default verifyFun;
