const mongoose = require("mongoose");
const User = require('../model/User')
const createToken = require('../token/createToken')

const UserController = {
    index : async(req,res) =>{
        let user = await User.find().populate('role')
        return res.status(200).json(user)
    },

    create : async(req,res) =>{
        try {
            let {fullname,email,address,phone,password,role} = req.body
            let user = await User.register(fullname,email,address,phone,password,role)
            let token = createToken(user._id)
            res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
            return res.status(200).json({user,token})

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    login : async(req,res)=>{
        try {
            let {email,password} = req.body
            let user = await User.login(email,password)
            let token = createToken(user._id)
            res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
            return res.status(200).json({user,token})
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    detail : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : "Invalid Id"})
            }
            let user = await User.findById(id).populate('role')
            if(!user){
                return res.status(404).json({message : "User Not Found"})
            }
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    update : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : "Invalid Id"})
            }
            let user = await User.findById(id)
            if(!user){
                return res.status(404).json({message : "User Not Found"})
            }
            let updateUser = await User.findByIdAndUpdate(id, { ...req.body }, { new: true })
            return res.status(200).json({updateUser,message : "User Updated"})
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    delete : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : "Invalid Id"})
            }
            let user = await User.findById(id)
            if(!user){
                return res.status(404).json({message : "User Not Found"})
            }
            let userDelete = await User.findByIdAndDelete(id)
            return res.status(200).json({message : "User Deleted"})
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    logout : async(req,res)=>{
        res.cookie('jwt','',{maxAge:1})
        return res.status(200).json({msg:'Logout'})
    },

    me : async(req,res)=>{
        try {
            let user = await User.findById(req.user._id).populate('role')
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController