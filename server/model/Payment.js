const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PaymentSchema = new Schema({
    payment : {
        type : String,
        required : true
    }
},{timestamps : true});

module.exports = mongoose.model("Payment",PaymentSchema)