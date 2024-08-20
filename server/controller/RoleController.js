const mongoose = require("mongoose");
const Role = require('../model/Role')

const RoleController = {
    index : async(req,res) => {
        try {
            let role = await Role.find()
            return res.status(200).json(role)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    create : async(req,res) => {
        try {
            let {name} = req.body
            let role = await Role.create({name})
            return res.status(200).json(role)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    detail : async(req,res) => {
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : "Invalid Id"})
            }
            let role = await Role.findById(id)
            if(!role){
                return res.status(404).json({message : "Role Not Found"})
            }
            return res.status(200).json(role)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    update : async(req,res) => {
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : "Invalid Id"})
            }
            let role = await Role.findById(id)
            if(!role){
                return res.status(404).json({message : "Role Not Found"})
            }

            let updateRole = await Role.findByIdAndUpdate(id, { ...req.body }, { new: true })
            return res.status(200).json({updateRole,message : "Role Updated"})
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    delete : async(req,res) => {
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : "Invalid Id"})
            }
            let role = await Role.findById(id)
            if(!role){
                return res.status(404).json({message : "Role Not Found"})
            }

            let roleDelete = await Role.findByIdAndDelete(id)
            return res.status(200).json({message : "Role Deleted"})
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = RoleController