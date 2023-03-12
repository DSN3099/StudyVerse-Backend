import express from 'express'
const router = express.Router();
import { login, glogin, register, logout } from '../Controllers/auth.js'

router.post('/login',login)
router.get('/logout',logout)
router.post('/glogin',glogin)
router.post('/register',register)

export default router;