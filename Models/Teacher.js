import mongoose, { Schema } from 'mongoose';

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
    },
    courses:[
        {type:Schema.Types.ObjectId, ref:'Course'}
    ]
})

export default mongoose.model("Teacher",TeacherSchema)
