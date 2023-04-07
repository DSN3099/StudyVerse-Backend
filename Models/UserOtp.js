import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserOtp = new Schema(({
    userId : {
        type: Schema.Types.ObjectId,
        ref : 'Users',
    },
    OTP : {
        type : String
    },
    createdAt : {
        type :Date
    },
    expireAt : {
        type: Date
    }
}))

export default mongoose.model('UserOtp',UserOtp)