import express from 'express'

import {
  addReview,
  getAllReviews,
  getReview,
  updateReview,
} from '../Controllers/Reviews.js'

import { verifytoken } from './VerifyToken.js'

const router = express.Router()

router.get('/', getAllReviews)
router.get('/:id', getReview)
router.post('/', addReview)
router.put('/:id', verifytoken, updateReview)
