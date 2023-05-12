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
        console.log(user);
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
        const {profession,bio} = req.body;
        const user = await Users.findById(req.user.id)
        user.profession = profession
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
        console.log(user)
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
