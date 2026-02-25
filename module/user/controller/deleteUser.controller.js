import { StatusCodes } from "http-status-codes";

const deleteUserFun = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error deleting user", error: error.message });
  }
};
export default deleteUserFun;
