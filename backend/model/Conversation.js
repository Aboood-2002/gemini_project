const mongoose = require("mongoose");
const joi = require("joi");

const Conversationschema = new mongoose.Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",
        required:true
    },
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
},
{
    timestamps:true
}
)

// Conversation model
const Conversation = mongoose.model("Conversation",Conversationschema);


module.exports = {
    Conversation,
}
