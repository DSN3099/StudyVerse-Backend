import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: false,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required : true,
    },

}, {timestamps:true})

export default mongoose.model("Users", UserSchema)