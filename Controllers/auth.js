import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Users from '../Models/Users.js'
import UserOtp from '../Models/UserOtp.js'
import emailjs from '@emailjs/nodejs';
import otpGenerator from 'otp-generator'
import jwt_decode from 'jwt-decode'

dotenv.config()

export const login = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email })
    if (!user) return res.status(404).json('User not found')
    if (user.isDeactivated) {
      return res.status(400).json('You have deactivated your account, please recover your account.')
    }
    const isCorrectPass = await bcrypt.compare(req.body.password, user.password)
    if (!isCorrectPass)
      return res.status(400).json('Incorrect password or email')

    const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: '1d' })

    const { password, ...otherDetail } = user._doc
    res
      .cookie('access_token', token, {
        secure: true,
        httpOnly: true,
        sameSite: "None"
      })
      .status(200)
      .json({ ...otherDetail, token })

    return
  } catch (error) {
    res.status(error.status || 500).send(error.message)
    return
  }
}

export const glogin = async (req, res, next) => {
  const { token } = req.body;
  try {
    const { email } = jwt_decode(token)
    const user = await Users.findOne({ email: email })
    if(!user){
      return res.status(401).json('User not found...')
    }
    const newtoken = jwt.sign({ id: user?._id }, process.env.JWT, { expiresIn: '1d' })
    res
      .cookie('access_token', newtoken, {
        secure: true,
        httpOnly: true,
        sameSite: "None"
      })
      .status(200)
      .json({ newtoken, message: 'SignIn successfull.' })
    return
  } catch (err) {
    return res.status(500).json(err)
  }
}

export const recoverAccount = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email })
    console.log(user)
    if(!user) return res.status(400).json('Account Recovery Time Up.')
    if (user.isDeactivated) {
      const isCorrectPass = await bcrypt.compare(req.body.password, user.password)
      if (!isCorrectPass)
        return res.status(400).json('Incorrect password or email')
      user.isDeactivated = false
      user.expireAt = null
      const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: '1d' })
      const { password, ...otherDetail } = user._doc
      res
        .cookie('access_token', token, {
          secure: true,
          httpOnly: true,
          sameSite: "None"
        })
        .status(200)
        .json({ ...otherDetail, token })
    }
    else {
      return res.status(400).status('Your account is active, please login.')
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const newUser = new Users({
      firstname: req.body.fname,
      lastname: req.body.lname,
      email: req.body.email,
      password: hash,
    })
    await newUser.save()
    res.status(200).send('User created successfully')
    return
  } catch (error) {
    res.status(error.status || 500).send(error.message)
    return
  }
}

export const logout = (req, res, next) => {
  res.clearCookie('access_token')
  res.status(201).json({ message: 'Logout Successfull' })
  return
}

export const verifyEmail = async (req, res, next) => {
  const { email } = req.body
  const user = await Users.find({ email: email })
  if (!user[0]) return res.status(400).json('User not found!!')
  else {
    const otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    const userOtp = await UserOtp.find({ userId: user[0]._id })
    console.log(userOtp)
    if (!userOtp[0]) {
      const userotp = new UserOtp({
        OTP: otp,
        userId: user[0]._id,
        createdAt: Date.now(),
        expireAt: Date.now() + 600000
      })
      userotp.save()
      try {
        await emailjs.send("service_ancctvq", "template_nwn0yfw", {
          email: user[0].email,
          OTP: otp,
        }, { publicKey: process.env.PUBLIC_KEY, privateKey: process.env.PRIVATE_KEY });
        return res.status(200).json({ message: 'Email sent successfully', otpId: userotp._id })
      }
      catch (err) {
        return res.status(200).json(err)
      }
    }
    else {
      userOtp[0].createdAt = Date.now()
      userOtp[0].expireAt = Date.now() + 600000
      userOtp[0].OTP = otp
      userOtp[0].save()
      try {
        await emailjs.send("service_ancctvq", "template_nwn0yfw", {
          email: user[0].email,
          OTP: otp,
        }, { publicKey: process.env.PUBLIC_KEY, privateKey: process.env.PRIVATE_KEY });
        return res.status(200).json({ message: 'Email sent successfully', otpId: userOtp[0]._id })
      }
      catch (err) {
        return res.status(200).json(err)
      }
    }
  }
}

export const verifyOtp = async (req, res, next) => {
  const { otpId, otp } = req.body
  const userOtp = await UserOtp.findById(otpId)
  console.log(userOtp, 'got it');
  if (Date.now() > userOtp.expireAt) {
    userOtp.remove()
    return res.status(419).json('Timeout')
  }
  if (otp === userOtp.OTP) return res.status(200).json({ message: 'verified', userId: userOtp.userId })
  else return res.status(400).json('Invalid OTP')
}

export const changePassword = async (req, res, next) => {
  const { id } = req.params
  const salt = bcrypt.genSaltSync(10)
  const newPass = bcrypt.hashSync(req.body.password, salt)
  try {
    await Users.findByIdAndUpdate(id, {
      $set: { password: newPass }
    }, { new: true })
    return res.status(200).json('Password updated successfully.')
  } catch (err) {
    res.status(400).json(err)
  }
}

export const changeCurrentPassword = async (req, res, next) => {
  const { id } = req.user
  const { newPass, currentPass } = req.body
  try {
    const user = await Users.findById(id)
    const isCorrectPass = await bcrypt.compare(currentPass, user.password)
    if (isCorrectPass) {
      const salt = bcrypt.genSaltSync(10)
      const newPassHash = bcrypt.hashSync(newPass, salt)
      user.password = newPassHash
      user.save()
      return res.status(200).json('Password updated successfully.')
    }
    else {
      return res.status(400).json('Current password is incorrect.')
    }
  } catch (err) {
    res.status(400).json(err)
  }
}