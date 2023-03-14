import mongoose from 'mongoose'
const reviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: 'Text is required',
  },
  rating: {
    type: Number,
    required: 'Rating is required',
  },
  userData: [],
  totalReviews: {
    type: Number,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref:'Users'
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.ObjectId,
      ref:"Users"
    },
  ],
  profilePic: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  report:{
    type:String
  },
  updated: Date,
})

export default mongoose.model('Review', reviewSchema)
