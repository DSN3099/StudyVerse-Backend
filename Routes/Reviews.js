import express from 'express'

import {
  addReview,
  getAllReviews,
  getReview,
  updateReview,
  addLikes,
  addDislikes,
} from '../Controllers/Reviews.js'

import { verifytoken } from './VerifyToken.js'

const router = express.Router()

router.get('/', getAllReviews)
router.get('/:id', getReview)
router.post('/', addReview)
router.patch('/:id', verifytoken, updateReview)
router.patch('/:id/like', verifytoken, addLikes)
router.patch('/:id/dislike', verifytoken, addDislikes)

export default router
