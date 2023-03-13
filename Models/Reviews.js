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
  course: {
    type: mongoose.Schema.ObjectId,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
  },
  totalReviews: {
    type: Number,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.ObjectId,
    },
  ],
  isLiked: {
    type: Boolean,
    default: false,
  },
  isDisliked: {
    type: Boolean,
    default: false,
  },

  profilePic: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
})

export default mongoose.model('Review', reviewSchema)
