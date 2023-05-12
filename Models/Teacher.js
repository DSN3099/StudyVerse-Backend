import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
    profession:{
        type: String,
        required: true
    },
    video:{
        type:String
    },
    bio:{
        type:String,
        required: true
    }, 
    userdata:{
        type:mongoose.Schema.Types.ObjectId,ref:"Users"
    }
})

export default mongoose.model("Teacher",TeacherSchema)
