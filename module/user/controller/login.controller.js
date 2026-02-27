import { StatusCodes } from "http-status-codes";
import prisma from "../../../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const loginFun = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid Credential " });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const age = 1000 * 60 * 60 * 24 * 7;
        const token = jwt.sign(
          { email: user.email, role: user.role, id: user.id },
          process.env.privateKey,
          { expiresIn: age },
        );
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: age,
        });
        res.status(StatusCodes.OK).json({
          message: "Login Successfully..!",
          token,
          id: user.id,
          email: user.email,
          name: user.username,
          avatar: user.avatar,
        });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Invalid password..!" });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
export default loginFun;
