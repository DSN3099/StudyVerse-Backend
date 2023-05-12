import express from 'express'

import {
    createPaymentIntent
} from '../Controllers/Payment.js'

import { verifytoken } from './VerifyToken.js'

const router = express.Router()

router.post('/create-payment-intent', createPaymentIntent)

export default router
