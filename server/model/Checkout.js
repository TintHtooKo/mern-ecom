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
        item: {
            type: Schema.Types.ObjectId,
            ref: "AddToCart", 
            required: true
        },
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
    }
}, { timestamps: true });

module.exports = mongoose.model("Checkout", CheckoutSchema);
