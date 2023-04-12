import express from 'express'
const router = express.Router();
import { login,glogin, register, logout, verifyEmail, changePassword, verifyOtp, recoverAccount } from '../Controllers/auth.js'

router.post('/login',login)
router.post('/glogin',glogin)
router.get('/logout',logout)
router.post('/register',register)
router.post('/verifyEmail',verifyEmail)
router.post('/verifyOtp',verifyOtp)
router.patch('/changepassword/:id',changePassword)
router.post('/recover',recoverAccount)

export default router;