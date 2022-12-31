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
        type:String
    },
    description:{
        type:String,
        trim:true,
    },
    reviews:[],
    category:{
        type:String,
        required:'Category is required'
    },
    price:{
        type:Number,
        required:true,
    },
    level:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
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
    lessons:[LessonSchema.schema]
})


export default mongoose.model('Course',courseSchema)