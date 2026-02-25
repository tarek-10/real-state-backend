import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import rbac from "../rbac/rbac.js";
const AutorizedFun = (endPoints) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
      }
      const token = authHeader.split(" ")[1];

      if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
      }
      const decoded = jwt.verify(token, process.env.privateKey);
      req.user = decoded;
      const isExist = await prisma.user.findUnique({
        where: {
          email: req.user.email,
        },
      });
      if (!isExist) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
      }
      const isAllowed = await rbac.can(req.user.role, endPoints);
      if (!isAllowed) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
      }
      next();
    } catch (error) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
    }
  };
};
export default AutorizedFun;
