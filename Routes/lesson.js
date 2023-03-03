import express from 'express'
import {
    addVideos, deleteVideo, editVideo
} from '../Controllers/lesson.js'
const router = express.Router()

router.post('/:id',addVideos)
router.delete('/:id/:videoId',deleteVideo)
router.patch('/:id',editVideo)

export default router;