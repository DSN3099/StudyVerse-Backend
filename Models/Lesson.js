import mongoose from 'mongoose'
import CommentSchema from './CommentSchema.js'

const LessonSchema= new mongoose.Schema({
    title:{
        type:String,
        content:String,
        required:true
    },
    videoUrl:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    description:{
        type:String,
    },
    comment:[CommentSchema.schema],
})


export default mongoose.model('Lesson',LessonSchema)