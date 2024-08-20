const mongoose = require('mongoose')
const Payment = require('../model/Payment')
const PaymentController = {
    index : async(req,res) => {
       try {
        let payment = await Payment.find()
        return res.status(200).json(payment)
       } catch (error) {
        return res.status(500).json({ error: error.message });
       }
    },

    create : async(req,res) => {
        try {
            let {payment} = req.body
            let data = await Payment.create({payment})
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
            let payment = await Payment.findById(id)
            if(!payment){
                return res.status(404).json({message : "Payment Not Found"})
            }
            return res.status(200).json(payment)
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
            let payment = await Payment.findById(id)
            if(!payment){
                return res.status(404).json({message : "Payment Not Found"})
            }
            let data = await Payment.findByIdAndUpdate(id,{...req.body},{new : true})
            return res.status(200).json({data,message : "Payment Updated"})
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
            let payment = await Payment.findById(id)
            if(!payment){
                return res.status(404).json({message : "Payment Not Found"})
            }
            let data = await Payment.findByIdAndDelete(id)
            return res.status(200).json({data,message : "Payment Deleted"})
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PaymentController