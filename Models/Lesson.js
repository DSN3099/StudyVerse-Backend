import mongoose from 'mongoose'

const LessonSchema= new mongoose.Schema({
    title:{
        type:String,
        content:String,
        required:true
    },
})


export default mongoose.model('Lesson',LessonSchema)