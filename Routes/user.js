import express from 'express'
import { getUserData } from '../Controllers/user.js';
import { verifytoken } from './VerifyToken.js'
const router = express.Router()

router.get('/:token',verifytoken,getUserData)

export default router;