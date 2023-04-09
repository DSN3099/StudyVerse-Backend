import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
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
    image:{
        type:String,
    },
    isDeactivated:{
        type: Boolean,
        default: false
    },
    deactivatedAt : {
        type: Date
    }

}, {timestamps:true})

export default mongoose.model("Users", UserSchema)