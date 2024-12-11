const asynchandler = require("express-async-handler");

const bcrypt = require("bcryptjs");

const { User , validateregisteruser, validateloginuser } = require("../model/User");




module.exports.register = asynchandler(async (req,res) => {

    const{ error } = validateregisteruser(req.body);
    if(error){
        return res.status(400).json({message : error.details[0].message});
    }

     let user = await User.findOne({email : req.body.email});
     if(user){
        return res.status(400).json({message : "this user is already registred"});
     }
      
     const salt = await bcrypt.genSalt(10);
     req.body.password = await bcrypt.hash(req.body.password,salt);

    user = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
          });

           const result = await user.save();
           const token = user.generateToken();
           const {password , ...other } = result._doc;

           res.status(201).json({...other,token});
       
})


module.exports.login = asynchandler(async (req,res) => {

    const{ error } = validateloginuser(req.body);
    if(error){
        return res.status(400).json({message : error.details[0].message});
    }

     let user = await User.findOne({email : req.body.email});
     if(!user){
        return res.status(400).json({message : "invalid email or password"});
     }
      
     const ispasswordmatched = await bcrypt.compare(req.body.password,user.password);
       if(!ispasswordmatched){
        return res.status(400).json({message : "invalid email or password"});
       
        }

           const token = user.generateToken();
           const {password , ...other } = user._doc;

           res.status(200).json({...other,token});
       
})


module.exports.userProfile = asynchandler(async (req, res) => {
    
    const user = await User.findById(req.user._id).select("-password");
    if(user){
        res.status(200).json(user);
    }
    else{     
    res.status(500).json({
    message: error.message,})}
})