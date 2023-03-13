import Reviews from '../Models/Reviews.js'

export const getAllReviews = async (req, res) => {
  try {
    const getAllReviews = await Reviews.find()
    res.status(200).json(getAllReviews)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const getReview = async (req, res) => {
  try {
    const getReview = await Reviews.findById(req.params.id)
    if (!getReview) res.status(404).send('Review not found...')
    res.status(200).json(getReview)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const addReview = async (req, res) => {
  const newReview = new Reviews({
    text: req.body.text,
    ...req.body,
  })
  try {
    await newReview.save()
    res.status(200).json(newReview)
  } catch (err) {
    res.status(400).json({ message: err })
  }
}

export const addLikes = async (req, res) => {
  const review = await Reviews.findById(req.params.id)

  if (!review) res.status(404).send('Review not found...')
  if (!review.likes.includes(req.body.userId)) {
    // await review.updateOne(
    //   { $push: { likes: req.body.userId } },
    //   {
    //     $set: { isLiked: true },
    //   },
    // )
    review.likes.push(req.body.userId)
    review.isLiked = true
    review.dislikes.pull(req.body.userId)
    review.isDisliked = false

    await review.save()

    res.status(200).json(review)
  } else {
    review.likes.pull(req.body.userId)
    review.isLiked = false
    await review.save()

    res.status(200).json(review)
  }
}
export const addDislikes = async (req, res) => {
  const review = await Reviews.findById(req.params.id)
  if (!review) res.status(404).send('Review not found...')
  if (!review.dislikes.includes(req.body.userId)) {
    // await review.updateMany(
    //   { $push: { dislikes: req.body.userId } },

    //   {
    //     $set: { isDisliked: true },
    //   },
    // )
    review.dislikes.push(req.body.userId)
    review.isDisliked = true
    review.likes.pull(req.body.userId)
    review.isLiked = false
    await review.save()
    res.status(200).json(review)
  } else {
    // await review.updateMany(
    //   { $pull: { dislikes: req.body.userId } },
    //   {
    //     $set: { isDisliked: false },
    //   },
    // )
    review.dislikes.pull(req.body.userId)
    review.isDisliked = false
    await review.save()
    res.status(200).json(review)
  }
}

export const updateReview = async (req, res) => {
  const review = await Reviews.findById(req.params.id)
  if (!review) res.status(404).send('Review not found...')
  if (review.userId === req.body.userId) {
    const updatedReview = await Reviews.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    )
    res.status(200).json(updatedReview)
  } else {
    res.status(403).send('You can only update your review...')
  }
}

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
