import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Users from '../Models/Users.js'

dotenv.config()

export const login = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email })
    if (!user) return res.status(404).json('User not found')

    const isCorrectPass = await bcrypt.compare(req.body.password, user.password)
    if (!isCorrectPass)
      return res.status(400).json('Incorrect password or email')

    const token = jwt.sign({ id: user._id }, process.env.JWT,{expiresIn:'1d'})

    const { password, ...otherDetail } = user._doc
    res
      .cookie('access_token', token)
      .status(200)
      .json({ ...otherDetail,token })

    return 
  } catch (error) {
    res.status(error.status || 500).send(error.message)
    return 
  }
}
export const glogin = async (req, res, next) => {}

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

export const logout = (req,res,next) =>{
    console.log("requested logout")
    res.clearCookie('access_token')
    res.status(201).json({message:'Logout Successfull'})
    return
}