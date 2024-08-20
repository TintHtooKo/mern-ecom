const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddToCartSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    product : [
        {
            item : {
            type : Schema.Types.ObjectId,
            ref : "Product",
            required : true
            },
            quantity : {
                type : Number,
                default : 1,
                required : true
            }
    }
    ]
},{timestamps : true})

module.exports = mongoose.model("AddToCart",AddToCartSchema)