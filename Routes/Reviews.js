import express from 'express'

import {
  addReview,
  getAllReviews,
  addLikes,
} from '../Controllers/Reviews.js'

import { verifytoken } from './VerifyToken.js'

const router = express.Router()

router.get('/:id',verifytoken, getAllReviews)
router.post('/:id',verifytoken, addReview)
router.patch('/:id', verifytoken, addLikes)

export default router
