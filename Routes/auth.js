import express from 'express'
const router = express.Router();
import {verifytoken} from '../Routes/VerifyToken.js'
import { login, glogin, register, logout, verifyEmail, changePassword, changeCurrentPassword, verifyOtp } from '../Controllers/auth.js'

router.post('/login',login)
router.get('/logout',logout)
router.post('/glogin',glogin)
router.post('/register',register)
router.post('/verifyEmail',verifyEmail)
router.post('/verifyOtp',verifyOtp)
router.patch('/changepassword/:id',changePassword)
router.patch('/changepassword', verifytoken, changeCurrentPassword)


export default router;