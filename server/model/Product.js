const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require('./Category')

const ProductSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    old_price : {
        type : Number,

    },
    new_price : {
        type : Number,
        required : true
    },
    short_desc : {
        type : String,
        required : true
    },
    long_desc : {
        type : String,
        required : true
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : "Category"
    },
    image : {
            type : String
        }
    
},{timestamps : true});

module.exports = mongoose.model("Product",ProductSchema)