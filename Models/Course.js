import mongoose, { Schema } from "mongoose";
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    image: {
        type: String
    },
    description: {
        type: String,
        trim: true,
    },
    reviews: [{
        type:Schema.Types.ObjectId,
        ref:'Review'
    }],
    category: {
        type: String,
        required: 'Category is required'
    },
    price: {
        type: Number,
        required: true,
    },
    level: {
        type: String,
    },
    rating: {
        type: Schema.Types.ObjectId,
        ref:'Ratings'
    },
    upadted: Date,
    created: {
        type: Date,
        default: Date.now
    },
    authorData: {
        type: Schema.Types.ObjectId,
        ref:'Users'
    },
    published: {
        type: Boolean,
        default: false
    },
    lessons: []
})


export default mongoose.model('Course', courseSchema)