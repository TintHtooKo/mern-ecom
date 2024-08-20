const mongoose = require("mongoose");
const Action = require('../model/Action')

const ActionController = {
    index : async(req,res) => {
        try {
            let action = await Action.find()
            return res.status(200).json(action)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    create : async(req,res) => {
        try {
            let {name} = req.body
            let action = await Action.create({name})
            return res.status(200).json(action)
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
            let action = await Action.findById(id)
            if(!action){
                return res.status(404).json({message : "Action Not Found"})
            }
            return res.status(200).json(action)
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
            let action = await Action.findById(id)
            if(!action){
                return res.status(404).json({message : "Action Not Found"})
            }
            let updateAction = await Action.findByIdAndUpdate(id, { ...req.body }, { new: true })
            return res.status(200).json({updateAction,message : "Action Updated"})
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
            let action = await Action.findById(id)
            if(!action){
                return res.status(404).json({message : "Action Not Found"})
            }
            let actionDelete = await Action.findByIdAndDelete(id)
            return res.status(200).json({message : "Action Deleted"})
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ActionController