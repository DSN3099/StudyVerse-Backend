import mongoose from "mongoose";
import LessonSchema from './Lesson.js';
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim:true,
        required: 'Name is required'

    },
    image:{
        data:Buffer,
        contentType:String
    },
    description:{
        type:String,
        trim:true,
    },
    category:{
        type:String,
        required:'Category is required'
    },
    upadted:Date,
    created:{
        type:Date,
        default:Date.now
    },
    instructor:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    published:{
        type:Boolean,
        default:false
    },
    lessons:[LessonSchema]


})


export default mongoose.model('Course',courseSchema)