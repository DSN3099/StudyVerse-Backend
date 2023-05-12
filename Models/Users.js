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
    bio:{
        type:String,
    },
    cart:[
        {type:mongoose.Schema.Types.ObjectId,ref:"Course"}
    ],
    image:{
        type:String,
    },
    isDeactivated:{
        type: Boolean,
        default: false
    },
    expireAt : {
        type: Date,
        default: null
    }

}, {timestamps:true})

UserSchema.index( { "expireAt": 1 }, { expireAfterSeconds: 0 } );

export default mongoose.model("Users", UserSchema)