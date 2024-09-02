const mongoose = require("mongoose");
const Product = require('../model/Product');
const removeFile = require("../helper/removeFile");
const sendEmail = require("../helper/sendEmail");
const User = require("../model/User");
const { login } = require("./UserController");

// mail send tr nrr ma lae yin creativecodermm ko pyan ky
// mail send yin ma kyr ag
// const Queue = require('bull')
// const emailQueue = new Queue('emailQueue', { redis: { port: 6379, host: '127.0.0.1' } }); 
// emailQueue.process(async (job) => {    
//     await sendEmail(job.data) 
// })


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

            // send mail to user when added new product (marketing email)
            // email ma htoke htr yin user ye all data paw nay mal, password pr paw nay loh
            let users = await User.find(null,['email'])

            // apaw ka users ko console htoke kyi yin user object nae email ya mal
            // emails only pal array nae lo chin loh user ko map pat p eamil ko htoke lite tal
            let emails = users.map((user)=>(user.email))
            
            // dr ka email po yin koe mail ko pyan ma send ag
            emails = emails.filter(email => email !== req.user.email)
            sendEmail({
                view : 'email',
                data : {
                    name : req.user.fullname,
                    product
                },
                // login lote htr tae user ka send mhr so tot req.user.email
                from : req.user.email,
                to : emails ,
                subject : 'New Product is Listing!!!',
            
                })
              
            return res.status(200).json(product)
        } catch (error) {
            console.log(error.message);
            
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

            if (req.file) {
                await removeFile(__dirname + '/../public' + product.image);
                data.image = '/' + req.file.filename;
            }
    
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