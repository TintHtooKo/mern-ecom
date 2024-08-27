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
            const { fullname, email, address, phone, payment, totalPrice } = req.body;
            const userId = req.user._id;
    
            if (!userId) {
                return res.status(400).json({ error: 'User is not authenticated' });
            }
    
            const pendingAction = await Action.findOne({ name: 'Pending' });
    
            if (!pendingAction) {
                return res.status(500).json({ error: 'Pending action not found' });
            }
    
            // Fetch cart items with product IDs and quantities
            const cart = await Cart.findOne({ user: userId }).populate({
                path: 'product.item',
                select: 'new_price image'
            });;
    
            if (!cart || cart.product.length === 0) {
                return res.status(400).json({ error: 'No cart items found' });
            }
    
            const cartItems = cart.product.map(cartItem => ({
                productId: cartItem.item._id,
                quantity: cartItem.quantity,
                price: cartItem.item.new_price, 
                image: cartItem.item.image 
            }));
    
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
    
            // Delete cart items after successful checkout
            await Cart.deleteMany({ user: userId });
            console.log("Cart items deleted successfully for user:", userId);
    
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