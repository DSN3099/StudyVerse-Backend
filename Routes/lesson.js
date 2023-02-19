import express from 'express'
import {
    getCourse,
    addVideos
} from '../Controllers/lesson.js'
const router = express.Router()

router.get('/:id', getCourse)
router.post('/:id',addVideos)

export default router;