const asynchandler = require("express-async-handler")
const {Chat} = require("../model/Chat")
const {Conversation} = require("../model/Conversation")


module.exports.createChat = asynchandler(async(req,res)=>{

    const userId = req.user._id

    const chat = await Chat.create({
        user : userId,
    })
    
    res.status(200).json(chat)

});


module.exports.getAllChats = asynchandler(async(req,res)=>{
    const chats = await Chat.find({user:req.user._id}).sort({
        createdAt: -1
    });

    res.status(200).json(chats);

});


module.exports.addConversation = asynchandler(async(req,res)=>{
    const chat = await Chat.findById(req.params.id)
    if(!chat){
        res.status(404).json({message:"No Chat with this id"})
    }

    const conversation = await Conversation.create({
        chat : chat._id,
        question : req.body.question,
        answer:req.body.answer,

    })

    const updatedChat = await Chat.findByIdAndUpdate(
        req.params.id,
        {latestMessage:req.body.question},
        {new:true},
    )

    res.status(200).json({
        conversation,
        updatedChat
    })

});



module.exports.getConversation = asynchandler(async(req,res)=>{
    const conversation = await Conversation.find({chat : req.params.id})

    if(!conversation){
        res.status(404).json({message:"No conversation with this id"})
    }

    res.status(200).json(conversation);
});



module.exports.deleteChat = asynchandler(async(req,res)=>{

    const chat = await Chat.findById(req.params.id)

    if(!chat){
        res.status(404).json({message:"No Chat with this id"})
    }

    if(chat.user.toString() !== req.user._id.toString())
        return res.status(403).json({
            message : "unauthorized"
        })

    await Chat.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message : "Chat has been deleted successfully"
    })

});


