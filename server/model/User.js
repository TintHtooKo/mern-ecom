const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Role = require('./Role')
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : Schema.Types.ObjectId,
        ref : 'Role',
        required : true
    }
},{timestamps : true});

UserSchema.statics.register = async function (fullname, email, address, phone, password, role) {
    let userExist = await this.findOne({ email });
    if (userExist) {
        throw new Error("Email already registered. Please use a different one.");
    }

    let phoneExist = await this.findOne({ phone });
    if (phoneExist) {
        throw new Error("Phone number already registered. Please use a different one.");
    }

    let salt = await bcrypt.genSalt();
    let hashPassword = await bcrypt.hash(password, salt);

    // Automatically assign the default role if no role is provided
    if (!role) {
        try {
            const defaultRole = await Role.findOne({ name: "User" });
            if (defaultRole) {
                role = defaultRole._id;
            } else {
                throw new Error('Default role "user" not found in the database.');
            }
        } catch (error) {
            console.log('Error fetching default role:', error.message);
            throw new Error("Role assignment failed.");
        }
    }

    let user = await this.create({ fullname, email, address, phone, password: hashPassword, role });
    return user;
}


UserSchema.statics.login = async function(email,password){
    let user = await this.findOne({email}).populate('role')
    if(!user){
        throw new Error("Your email is not registered")
    }
    let isPassMatch = await bcrypt.compare(password,user.password)
    if(!isPassMatch){
        throw new Error("Incorrect password")
    }else{
        return user
    }
}

module.exports = mongoose.model("User",UserSchema)