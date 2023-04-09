import Users from '../Models/Users.js'

export const getUserData = async(req,res,next) =>{
    const user = await Users.findById(req.user.id)
    return res.status(200).json(user)
}

export const uploadImage = async(req,res,next) =>{
    try{
        const user = await Users.findById(req.user.id)
        user.image = req.body.imageUrl
        user.save()
        return res.status(200).json('Profile updated successfully.')
    }catch(err){
        return res.status(500).json(err)
    }
}

export const deactivateAccount = async(req,res,next) =>{
    try{
        const user = await Users.findById(req.user.id)
        user.isDeactivated = true
        user.deactivatedAt = Date.now()
        user.save()
        return res.status(200).json('Account deactivated successfully.')
    }catch(err){
        return res.status(500).json(err)
    }
}