const mongoose = require("mongoose");
const Checkout = require('../model/Checkout')
const Action = require('../model/Action')
const Cart = require('../model/AddToCart')

const CheckoutController = {
    index : async(req,res) =>{
        try {
            let checkout = await Checkout.find()
            return res.status(200).json(checkout)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },
    create : async(req,res) =>{
        try {
            const { fullname,email,address,phone, cartItems, payment, totalPrice } = req.body;

            // Fetch the "Pending" action from the Action model
            const pendingAction = await Action.findOne({ name: 'Pending' });

            if (!pendingAction) {
                return res.status(500).json({ error: 'Pending action not found' });
            }

            // Create a new Checkout record with the "Pending" action
            let checkout = await Checkout.create({
                fullname,email,address,phone,
                cartItems,
                payment,
                action: pendingAction._id, // Set default action to "Pending"
                totalPrice
            });
            // Remove cart items after successful checkout
            await Cart.deleteMany({ user: req.user._id });

            return res.status(200).json(checkout);
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
    }
}

module.exports = CheckoutController