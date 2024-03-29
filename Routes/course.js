import express from 'express'
import {
  addCourse,
  getAllCourse,
  getCourse,
  updateCourse,
} from '../Controllers/course.js'
import { verifytoken } from './VerifyToken.js'
const router = express.Router()

router.get('/',verifytoken, getAllCourse)
router.get('/:id',verifytoken, getCourse)
router.post('/',verifytoken, addCourse)
router.put('/:id', verifytoken, updateCourse)

export default router
