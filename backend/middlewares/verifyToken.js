const jwt = require("jsonwebtoken");
const { User } = require("../model/User")


// verify token 
// module.exports.verifytoken = async (req,res,next)=>{
//     const token = req.headers.token;

//     if(token){
//         try {
//             const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
//             req.user._id = await User.findById(decoded._id);
//             next();
//         } catch (error) {
//             res.status(401).json({message:"invalid token"}); 
//         }
//     }else{ //401 unautthorized
//         res.status(401).json({message:"no token provided"});
//     }

// }

// verify token 
const verifyToken =  async (req,res,next) =>{
    const token = req.headers.token;

    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.user = await User.findById(decoded.id) ;
          
            next();
        } catch (error) {
            res.status(401).json({message:"invalid token"}); 
        }
    }else{ //401 unauthorized
        res.status(401).json({message:"no token provided"});
    }

}


module.exports = 
{   verifyToken,
    
}