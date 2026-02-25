import { StatusCodes } from "http-status-codes";

const logoutFun = async (req, res) => {
  console.log("logout..!");
  res
    .clearCookie("token")
    .status(StatusCodes.OK)
    .json({ message: "successful logout..!" });
};
export default logoutFun;
