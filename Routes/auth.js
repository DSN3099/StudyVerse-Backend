import express from 'express'
import { verifytoken } from './VerifyToken.js';
const router = express.Router();
import { login,glogin, register, logout, verifyEmail, changePassword, verifyOtp, recoverAccount, changeCurrentPassword } from '../Controllers/auth.js'

router.post('/login',login)
router.post('/glogin',glogin)
router.get('/logout',logout)
router.post('/register',register)
router.post('/verifyEmail',verifyEmail)
router.post('/verifyOtp',verifyOtp)
router.patch('/changepassword/:id',changePassword)
router.patch('/changepassword',verifytoken,changeCurrentPassword)
router.post('/recover',verifytoken,recoverAccount)

export default router;