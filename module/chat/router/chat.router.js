import express from "express";
const router = express.Router();
import AutorizedFun from "../../../middleware/isAuthorized.js";
import { ADD_CHAT, GET_CHAT, READ_CHAT } from "../endPoints.js";
//chat
import getChatsFun from "../controller/getchats.controller.js";
router.get("/", AutorizedFun(GET_CHAT), getChatsFun);
//end
//get chat by id
import getchatFun from "../controller/getchat.controller.js";
router.get("/:id", AutorizedFun(GET_CHAT), getchatFun);
//end
//add chat
import addChatFun from "../controller/addchat.controller.js";
router.post("/add", AutorizedFun(ADD_CHAT), addChatFun);
//end
//read chat
import readChatFun from "../controller/readChat.controller.js";
router.post("/read/:id", AutorizedFun(READ_CHAT), readChatFun);
//end
export default router;
