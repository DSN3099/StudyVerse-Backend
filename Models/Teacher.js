import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
    profession:{
        type: String,
    },
    video:{
        type:String
    },
    bio:{
        type:String,
    },
    verified:{
        type: Boolean,
        default:false
    }
})

export default mongoose.model("Teacher",TeacherSchema)
