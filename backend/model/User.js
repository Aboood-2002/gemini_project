const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");

const Userschema = new mongoose.Schema({
    email :{
        type: String,
        required : true,
        trim :true,
        minlength:5,
        maxlength:100,
        unique : true
    },

    username : {
        type: String,
        required : true,
        trim :true,
        minlength:2,
        maxlength:100
    },

    password : {
        type: String,
        required : true,
        trim :true,
        minlength:6,
    },
    isadmin:{
        type : Boolean,
        default :false
    },
},
{timestamps : true}
);
 
//generate token
Userschema.methods.generateToken = function () {
  return jwt.sign({id : this._id , isadmin : this.isadmin},process.env.JWT_SECRET_KEY);
}

//User model
const User = mongoose.model("User",Userschema);

//validate register user

function validateregisteruser(obj){
  const schema = joi.object({
      email : joi.string().trim().min(5).max(100).email().required(),
      username : joi.string().trim().min(2).max(100).required(),
      password : joi.string().min(6).required(),

  })
  return schema.validate 
  (obj);
}

// validate login user
function validateloginuser(obj){
  const schema = joi.object({
      email : joi.string().required().trim().min(5).max(100).email(),
      password : joi.string().required().min(6),

  })
  return schema.validate(obj);
}


module.exports = {
  User,
  validateregisteruser,
  validateloginuser,
};