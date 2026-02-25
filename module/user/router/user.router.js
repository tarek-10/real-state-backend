import express from "express";

const router = express.Router();
import upload from "../../../middleware/multer.js";

import validationResult from "../../../middleware/handleValidation.js";
import {
  getUserByIdValidation,
  registerValidation,
} from "../joi/user.validation.js";
import AutorizedFun from "../../../middleware/isAuthorized.js";
import {
  DELETE_USER,
  GET_USER_BY_ID,
  GET_USERS,
  SAVE_POST,
  UPDATE_USER,
  USER_PROFILE,
  USER_NOTIFIACTION,
} from "../endPoints.js";
//user authentication routes
//register
import registerFun from "../controller/register.conrtoller.js";
router.post(
  "/register",
  upload.single("image"),
  validationResult(registerValidation),
  registerFun,
);
//end register
//login
import loginFun from "../controller/login.controller.js";
router.post("/login", loginFun);
//end login
//logout
import logoutFun from "../controller/logout.controller.js";
router.post("/logout", logoutFun);
//end logout
//verify user
import verifyFun from "../controller/verify.controller.js";
router.get("/verify/:token", verifyFun);
//end verify user
//end user authentication routes

//users routes
//get all users
import getUsersFun from "../controller/getAllUsers.controller.js";
router.get("/users", getUsersFun);
//end
//get user by id
import getUserByIdFun from "../controller/getUserById.controller.js";
router.get(
  "/user/:id",
  validationResult(getUserByIdValidation),
  AutorizedFun(GET_USER_BY_ID),
  getUserByIdFun,
);
//end
//update user
import updateUserFun from "../controller/updateUser.controller.js";
router.put(
  "/user/update/:id",
  validationResult(getUserByIdFun),
  AutorizedFun(UPDATE_USER),
  updateUserFun,
);
//end
//delete user
import deleteUserFun from "../controller/deleteUser.controller.js";
router.delete(
  "/user/delete/:id",
  validationResult(getUserByIdFun),
  AutorizedFun(DELETE_USER),
  deleteUserFun,
);
//end
//save post
import savePostFun from "../controller/savePostFun.controller.js";
router.post("/save", AutorizedFun(SAVE_POST), savePostFun);
//end
//userProfilePost
import profilePostsFun from "../controller/userProfile.controller.js";
router.get("/profilePosts", AutorizedFun(USER_PROFILE), profilePostsFun);
//end

//end users routes
export default router;
