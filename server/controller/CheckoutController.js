const mongoose = require("mongoose");
const Checkout = require('../model/Checkout')
const Action = require('../model/Action')
const Cart = require('../model/AddToCart')
const Product = require('../model/Product')

const CheckoutController = {
    index : async(req,res) =>{
        try {
            let checkout = await Checkout.find()
            return res.status(200).json(checkout)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },
    create: async(req, res) => {
        try {
            const { fullname, email, address, phone, cartItems, payment, totalPrice } = req.body;
            const userId = req.user._id;
    
            if (!userId) {
                return res.status(400).json({ error: 'User is not authenticated' });
            }
    
            const pendingAction = await Action.findOne({ name: 'Pending' });
    
            if (!pendingAction) {
                return res.status(500).json({ error: 'Pending action not found' });
            }
    
            let checkout = await Checkout.create({
                fullname,
                email,
                address, 
                phone,
                cartItems,
                payment,
                action: pendingAction._id, // Set default action to "Pending"
                totalPrice,
                userId 
            });
    
            // Check if cart items exist before attempting to delete
            const cartItemsToDelete = await Cart.findOne({ user:userId }).populate('product.item');
           console.log(cartItemsToDelete);
           
        //    You're checking if (cartItemsToDelete.length > 0), but cartItemsToDelete is an object,
        // not an array. Therefore, the length property doesn't exist on it, leading to the 
        // condition always evaluating to false, and thus the code falls into the else block, 
        // logging "No cart items found."
        // စစချင်း if (cartItemsToDelete.length > 0) နဲ့ စစ်နေလို့ cart ထဲက data မပျက်တာ
        
            if (cartItemsToDelete && cartItemsToDelete.product.length > 0) {
                await Cart.deleteMany({ user:userId });
                console.log("Cart items deleted successfully for user:", userId);
            } else {
                console.log("No cart items found for user:", userId);
            }
    
            return res.status(200).json(checkout);
        } catch (error) {
            console.log(error.message);
            
            return res.status(500).json({ error: error.message });
        }
    },
    
    detail : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : "Invalid Id"})
            }
            let checkout = await Checkout.findById(id)
            if(!checkout){
                return res.status(404).json({message : "Checkout Not Found"})
            }
            return res.status(200).json(checkout)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },
    update : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : "Invalid Id"})
            }
            let checkout = await Checkout.findById(id)
            if(!checkout){
                return res.status(404).json({message : "Checkout Not Found"})
            }
            checkout = await Checkout.findByIdAndUpdate(id,{...req.body},{new : true})
            return res.status(200).json(checkout)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },
    delete : async(req,res) =>{
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : "Invalid Id"})
            }
            let checkout = await Checkout.findById(id)
            if(!checkout){
                return res.status(404).json({message : "Checkout Not Found"})
            }
            checkout = await Checkout.findByIdAndDelete(id)
            return res.status(200).json({message : "Checkout Deleted"})
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    history : async(req,res) =>{
        try {
            const userId = req.user._id; 
            console.log('User ID:', userId); 
            const checkout = await Checkout.find({userId}).populate('action')
            console.log(checkout);
            
            if(!checkout || checkout.length == 0){
                return res.status(404).json({message : "Checkout Not Found"})
            }
            return res.status(200).json(checkout)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

module.exports = CheckoutController