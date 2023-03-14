import express from 'express'

import {
  addReview,
  getAllReviews,
  addLikes,
  addDislikes,
} from '../Controllers/Reviews.js'

import { verifytoken } from './VerifyToken.js'

const router = express.Router()

router.get('/:id',verifytoken, getAllReviews)
router.post('/:id',verifytoken, addReview)
router.patch('/:id/like', verifytoken, addLikes)
router.patch('/:id/dislike', verifytoken, addDislikes)

export default router
