import Users from '../Models/Users.js'

export const getUserData = async(req,res,next) =>{
    const user = await Users.findById(req.user.id)
    return res.status(200).json(user)
    // console.log(user//)
}