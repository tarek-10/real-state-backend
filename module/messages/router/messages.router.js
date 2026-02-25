import express from "express";
const router = express.Router();
import AutorizedFun from "../../../middleware/isAuthorized.js";
import { ADD_MESSAGE } from "../endPoints.js";
//add message
import addMessageFun from "../controller/addMessage.controller.js";
router.post("/add/:chatId", AutorizedFun(ADD_MESSAGE), addMessageFun);
//end
export default router;
