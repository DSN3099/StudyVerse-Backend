import express from 'express'
import {
    addVideos
} from '../Controllers/lesson.js'
const router = express.Router()

router.post('/:id',addVideos)

export default router;