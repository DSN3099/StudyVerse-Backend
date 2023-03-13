import jwt_decode from 'jwt-decode'
import Users from '../Models/Users.js'

export const getUserData = async(req,res,next) =>{
    const {token} = req.params
    const {id} = jwt_decode(token)
    const user = await Users.findById(id)
    console.log(user)
}