const Content = require('../model/Content')
const mongoose = require('mongoose')
const ContentController = {
    index : async(req,res) => {
        try {
            let content = await Content.find()
            return res.status(200).json(content)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    create : async(req,res) =>{
        try {
            let {fullname,email,message} = req.body
            let content = await Content.create({fullname,email,message})
            return res.status(200).json(content)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    detail : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({ error: 'Invalid ID' });
            }
            let content = await Content.findById(id)
            if(!content){
                return res.status(404).json({ error: 'Content Not Found' });
            }
            return res.status(200).json(content)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    delete : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({ error: 'Invalid ID' });
            }
            let content = await Content.findById(id)
            if(!content){
                return res.status(404).json({ error: 'Content Not Found' });
            }
            let contentDelete = await Content.findByIdAndDelete(id)
            return res.status(200).json({message : "Content Deleted"})
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ContentController