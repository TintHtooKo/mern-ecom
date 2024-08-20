const Category = require('../model/Category')
const mongoose = require('mongoose')

const CategoryController = {
    index : async(req,res) =>{
        try {
            let category = await Category.find()
            return res.json(category)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    create : async(req,res) =>{
        try {
            let {name} = req.body
            let data = await Category.create({name})
            return res.status(200).json(data)
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

            let category = await Category.findById(id)
            if(!category){
                return res.status(404).json({message : "Category Not Found"})
            }
                return res.json(category)

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            let id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid Id" });
            }
    
            let currentData = await Category.findById(id);
            if (!currentData) {
                return res.status(404).json({ message: "Category Not Found" });
            }
    
            let data = await Category.findByIdAndUpdate(id, { ...req.body }, { new: true });
            return res.status(200).json({ data, message: "Category Updated" }); // Message is now inside the JSON object
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
            let currentData = await Category.findById(id)
            if(!currentData){
                return res.status(404).json({message : "Category Not Found"})
            }
            let data = await Category.findByIdAndDelete(id)
            return res.status(200).json({message : "Category Deleted"})
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CategoryController