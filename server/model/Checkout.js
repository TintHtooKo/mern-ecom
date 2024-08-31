const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckoutSchema = new Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    cartItems: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",  // Assuming you have a Product model
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: { 
            type: Number, 
            required: true  
        },
        image: { 
            type: String, 
            required: true 
        } 
    }],
    action: {
        type: Schema.Types.ObjectId,
        ref: "Action",
        required: true,
        default : null
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Checkout", CheckoutSchema);
