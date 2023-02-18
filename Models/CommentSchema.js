import mongoose from 'mongoose'
const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    courseId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    like: {
        type: Number,
        default:0,
    },
    images:[],
},{timestamps:true})

export default mongoose.model('CommentSchema', CommentSchema)