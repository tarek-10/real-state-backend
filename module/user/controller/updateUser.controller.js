import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma.js";
const updateUserFun = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    } else {
      const updatedData = await prisma.user.update({
        where: { id },
        data: {
          username: body.username || user.username,
          email: body.email || user.email,
          password: body.password
            ? await bcrypt.hash(body.password, 10)
            : user.password,
          avatar: body.avatar || user.avatar,
        },
      });

      res
        .status(StatusCodes.OK)
        .json({ message: "User updated successfully", user: updatedData });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error updating user", error: error.message });
  }
};
export default updateUserFun;
