const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContentSchema = new Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    }
},{timestamps : true});

module.exports = mongoose.model("Content",ContentSchema)