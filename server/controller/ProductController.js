const mongoose = require("mongoose");
const Product = require('../model/Product');
const removeFile = require("../helper/removeFile");

const ProductController = {
    index: async (req, res) => {
        try {
            let query = {};

            // Check if a category filter is present in the query parameters
            if (req.query.category) {
                query.category = new mongoose.Types.ObjectId(req.query.category);
            }

            // Find products based on the query (with or without category filter)
            let products = await Product.find(query).populate('category');
            return res.json(products);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },


    create : async(req,res)=>{
        try {
            let {name,old_price,new_price,short_desc,long_desc,category} = req.body
            let product = await Product.create({name,old_price,new_price,short_desc,long_desc,category})
            return res.status(200).json(product)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    detail : async(req,res)=>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : "Invalid Id"})
            }
            let product = await Product.findById(id).populate('category')
            if(!product){
                return res.status(404).json({message : "Product Not Found"})
            }
            return res.json(product)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    update : async(req,res)=>{
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : "Invalid Id"});
            }
    
            let product = await Product.findById(id);
            if(!product){
                return res.status(404).json({message : "Product Not Found"});
            }
    

            let data = await Product.findByIdAndUpdate(id, { ...req.body }, { new: true });
    
            return res.status(200).json({data, message : "Product Updated"});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    

    delete : async(req,res)=>{
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : "Invalid Id"});
            }
            let product = await Product.findById(id);
            if(!product){
                return res.status(404).json({message : "Product Not Found"});
            }
            let data = await Product.findByIdAndDelete(id);
            await removeFile(__dirname + '/../public' + product.image);
            return res.status(200).json({ message : "Product Deleted"});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    upload : async(req,res)=>{
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : "Invalid Id"});
            }
            let existingData = await Product.findById(id);
            if (!existingData) {
                return res.json({ msg: 'Not found' });
            }
            let updateData = { image: '/' + req.file.filename };

            // Handle the file removal if the profile is being updated
            if (existingData.image && existingData.image !== updateData.image) {
                await removeFile(__dirname + '/../public' + existingData.image);
            }

            // Update the document
            let data = await Product.findByIdAndUpdate(id, updateData, { new: true });

            return res.status(200).json({msg:'Upload success'})
            
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProductController