const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
    name : {
        type : String,
        required : true
    }
},{timestamps : true});

module.exports = mongoose.model("Action",ActionSchema)