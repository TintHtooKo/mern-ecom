const jwt = require("jsonwebtoken");
const User = require('../model/User')

const AuthMiddleware = async(req,res,next)=>{
    let token = req.cookies.jwt
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(err,decodedToken)=>{
            if(err){
                return res.status(400).json({message : "Unauthenticated"})
            }else{
                User.findById(decodedToken._id).then(user=>{
                    req.user = user
                    next()
                })
            }
        })
    }else{
        res.status(400).json({message : "Token is not provided"})
    }
}

module.exports = AuthMiddleware