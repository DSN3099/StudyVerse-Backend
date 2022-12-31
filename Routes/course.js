import express from 'express'
import { addCourse, getAllCourse, getCourse, updateCourse } from '../Controllers/course.js'
const router = express.Router()

router.get('/',getAllCourse)
router.get('/:id',getCourse)
router.post('/',addCourse)
router.post('/:id',updateCourse)

export default router;