const express = require("express");

const router = express.Router();

const {createChat, getAllChats, addConversation, getConversation, deleteChat} = require("../controller/chatController");

const {verifyToken} = require("../middlewares/verifyToken");


router.post("/new",verifyToken,createChat);

router.get("/all",verifyToken,getAllChats);

router.post("/:id",verifyToken,addConversation);

router.get("/:id",verifyToken,getConversation);

router.delete("/:id",verifyToken,deleteChat);







module.exports = router;