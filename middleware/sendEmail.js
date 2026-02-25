import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";
const sendEmail = async (dest, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
      user: process.env.USER_SENDER,
      pass: process.env.USER_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: "Tarek Mohamed..!",
    to: dest,
    subject: "Hello ✔",
    text: "Hello world?", // Plain-text version of the message
    html: message, // HTML version of the message
  });
};
export default sendEmail;
