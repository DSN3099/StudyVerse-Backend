import Reviews from '../Models/Reviews.js'
import Course from '../Models/Course.js'
import Users from '../Models/Users.js'

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
    const { firstname, lastname, image } = await Users.findById(req.user.id)
    const newReview = new Reviews({
      text: req.body.text,
      userData: { firstname, lastname, image },
      ...req.body,
    })
    await newReview.save()
    const course = await Course.findByIdAndUpdate(id, { $push: { reviews: newReview._id } }, { new: true, upsert: true })
    res.status(200).json(newReview)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const addLikes = async (req, res) => {
  try {
    const { id } = req.params
    const review = await Reviews.findById(id)
    if (!review) return res.status(404).send('Review not found...')
    if (req.body.action === 'LIKE') {
      if (!review.likes.includes(req.user.id)) {
        review.likes.push(req.user.id)
        review.dislikes.pull(req.user.id)
      } else {
        review.likes.pull(req.user.id)

      }
    } else if (req.body.action === 'DISLIKE') {
      if (!review.dislikes.includes(req.user.id)) {
        review.dislikes.push(req.user.id)
        review.likes.pull(req.user.id)

      } else {
        review.dislikes.pull(req.user.id)
      }
    } else {
      review.report = req.body.reportDescription
      await review.save()
      return res.status(200).json('reported successfully')
    }
    await review.save()
    return res.status(200).json(review)
  }
  catch (err) {
    res.status(500).json({ message: err })
  }
}
//  
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
