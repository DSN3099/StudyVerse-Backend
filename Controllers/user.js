import Users from '../Models/Users.js'

export const getUserData = async(req,res,next) =>{
    try{
        const user = await Users.findById(req.user.id).populate('teacherData').select('firstname lastname email bio image isTeacher teacherData cart')
        return res.status(200).json(user)

    }catch(err){
        return res.status(500).json(err)
    }
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
        user.expireAt = Date.now() + 172800000
        await user.save()
        return res.status(200).json('Account deactivated successfully.')
    }catch(err){
        return res.status(500).json(err)
    }
}

export const updateuserdata = async(req,res,next) =>{
    try{
        const {bio} = req.body;
        const user = await Users.findById(req.user.id)
        user.bio = bio
        await user.save()
        return res.status(200).json('Profile updated successfully.')
    }catch(err){
        return res.status(500).json(err)
    }
}

export const addToCart = async(req,res,next) =>{
    try{
        const user = await Users.findById(req.user.id)
        user.cart.push(req.body.courseId)
        user.save()
        return res.status(200).json('Course added to the cart...')
    }catch(err){
        return res.status(400).json(err)
    }
}

export const getCart = async(req,res,next) =>{
    try{
        const user = await Users.findById(req.user.id).populate({
            path:'cart',
            populate:{ path : 'authorData', select:'firstname lastname'},
            select:'authorData title image price'
        })
        return res.status(200).json(user.cart)
    }catch(err){
        return res.status(400).json(err)
    }
}

export const deleteCart = async(req,res,next) =>{
    try{
        const user = await Users.findById(req.user.id)
        user.cart.pull(req.params.id)
        user.save()
        return res.status(200).json('Course added to the cart...')
    }catch(err){
        return res.status(400).json(err)
    }
}

export const emptyCart = async(req,res,next) =>{
    try{
        const user = await Users.findById(req.user.id)
        user.cart = []
        user.save()
        return res.status(200).json(user.cart)
    }catch(err){
        return res.status(400).json(err)
    }
}
