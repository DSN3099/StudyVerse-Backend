import express from 'express'
import {
    addVideos, deleteVideo, editVideo
} from '../Controllers/lesson.js'
import { verifytoken } from './VerifyToken.js'
const router = express.Router()

router.post('/:id',verifytoken,addVideos)
router.delete('/:id/:videoId',verifytoken,deleteVideo)
router.patch('/:id',verifytoken,editVideo)

export default router;