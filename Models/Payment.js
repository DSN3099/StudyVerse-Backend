import mongoose from 'mongoose'
import { User } from './User.js'

const PaymentShema = mongoose.schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  paymentId: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  paymentMethod: {
    type: String,
    enum: ['card', 'cash'],

    required: true,
  },
  card: {
    brand: { type: String, required: true },
  },
  paymentDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Payment = mongoose.model('Payment', PaymentShema)
module.exports = Payment
