import express from 'express'
import {
  addCourse,
  getAllCourse,
  getCourse,
  updateCourse,
} from '../Controllers/course.js'
import { verifytoken } from './VerifyToken.js'
const router = express.Router()

router.get('/', getAllCourse)
router.get('/:id', getCourse)
router.post('/', addCourse)
router.put('/:id', verifytoken, updateCourse)

export default router
