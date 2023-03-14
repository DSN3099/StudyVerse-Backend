import Reviews from '../Models/Reviews.js'
import Course from '../Models/Course.js'

export const getAllReviews = async (req, res) => {
  try {
    const { id } = req.params
    const course = await Course.findById(id).populate('reviews')
    res.status(200).json(course.reviews)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const addReview = async (req, res) => {
  try {
    const { id } = req.params
    const newReview = new Reviews({
      text: req.body.text,
      ...req.body,
    })
    await newReview.save()
    const course = await Course.findByIdAndUpdate(id,{$push:{reviews:newReview._id}},{new:true,upsert:true})
    res.status(200).json(newReview)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const addLikes = async (req, res) => {
  try {
    const {id} = req.params
    const review = await Reviews.findById(id)
    if (!review) return res.status(404).send('Review not found...')
    if (!review.likes.includes(req.body.userId)) {
      review.likes.push(req.user.id)
      review.dislikes.pull(req.user.id)
      await review.save()
      return res.status(200).json(review)
    } else {
      review.likes.pull(req.user.id)
      await review.save()
      return res.status(200).json(review)
    } 
  }
  catch(err){
    res.status(500).json({message:err})
  }
}
export const addDislikes = async (req, res) => {
  const review = await Reviews.findById(req.params.id)
  if (!review) return res.status(404).send('Review not found...')
  if (!review.dislikes.includes(req.user.id)) {
    review.dislikes.push(req.user.id)
    review.likes.pull(req.user.id)
    await review.save()
    return res.status(200).json(review)
  } else {
    review.dislikes.pull(req.user.id)
    await review.save()
    return res.status(200).json(review)
  }
}

// export const updateReview = async (req, res) => {
//   const review = await Reviews.findById(req.params.id)
//   if (!review) res.status(404).send('Review not found...')
//   if (review.userId === req.body.userId) {
//     const updatedReview = await Reviews.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true },
//     )
//     res.status(200).json(updatedReview)
//   } else {
//     res.status(403).send('You can only update your review...')
//   }
// }

export const deleteReview = async (req, res) => {
  const review = await Reviews.findById(req.params.id)
  if (!review) res.status(404).send('Review not found...')
  if (review.userId === req.body.userId) {
    const deletedReview = await Reviews.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedReview)
  } else {
    res.status(403).send('You can only delete your review...')
  }
}
