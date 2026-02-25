import express, { Router } from "express";
const router = express.Router();
import upload from "../../../middleware/multer.js";
import AutorizedFun from "../../../middleware/isAuthorized.js";
//get posts
import getALLPostsFun from "../controller/getAllPosts.controller.js";
import {
  CREATE_POST,
  DELETE_POST,
  POST_DETAILS,
  UPDATE_POST,
} from "../endPoints.js";
router.get("/", getALLPostsFun);
//end
//get post by id
import getPostByIdFun from "../controller/getPostById.controller.js";
router.get("/:id", getPostByIdFun);
//end
//create post
import createPostFun from "../controller/createPost.controller.js";
router.post(
  "/create",
  // upload.array("image"),
  AutorizedFun(CREATE_POST),
  createPostFun,
);
//end
//update post

//end
//delete post
import deletePostFun from "../controller/deletePost.controller.js";
router.delete("/:id", AutorizedFun(DELETE_POST), deletePostFun);
//end
//post details
import postDetailsFun from "../controller/postDetail.controller.js";
router.post("/details", AutorizedFun(POST_DETAILS), postDetailsFun);
//end
export default router;
