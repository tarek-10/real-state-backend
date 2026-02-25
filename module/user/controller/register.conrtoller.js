import prisma from "../../../lib/prisma.js";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import sendEmail from "../../../middleware/sendEmail.js";
const registerFun = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "User already exists" });
    } else {
      const token = jwt.sign({ email: email }, process.env.privateKey);
      const message = `<a href='http://localhost:3000/api/auth/verify/${token}'>verify your mail</a>`;
      let imageUrl = process.env.IMAGE_URL + req.file.filename;
      bcrypt.hash(password, 10, async function (err, hash) {
        // Store hash in your password DB.
        const newUser = await prisma.user.create({
          data: {
            username,
            email,
            password: hash,
            avatar: imageUrl,
            isConfirmed: false,
          },
        });
        await sendEmail(email, message);
        res
          .status(StatusCodes.CREATED)
          .json({ message: "User created successfully", newUser });
      });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
export default registerFun;
