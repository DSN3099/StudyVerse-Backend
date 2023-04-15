import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profession:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required : true,
    },
    bio:{
        type:String,
        required:true,
    },
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

    myWishlist: [
      {
        type: String,
        ref: "Courses",
      },
    ],
    myCourses: [
      {
        type: String,
        ref: "Courses",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.index( { "expireAt": 1 }, { expireAfterSeconds: 0 } );

export default mongoose.model("Users", UserSchema)
