import Course from '../Models/Course.js'

export const addVideos = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        course.lessons.push(req.body)
        course.save()
        res.status(202).json(course)
        return 
    } catch (err) {
        res.status(500).json({ message: err })
        return 
    }
}

export const editVideo = async (req, res) => {
    const {id} = req.params
    const {id:videoId,videoname} = req.body
    try{
        const course = await Course.updateOne({_id:id,"lessons.id":videoId},
            {
                $set : {"lessons.$.name":videoname}
            }
        )
        res.status(201).json(course)
        return 
    }
    catch(err){
        res.status(500).json({message:err})
        return 
    }
}

export const deleteVideo = async (req, res) => {
    const { id ,videoId} = req.params
    try{
        const course = await Course.findByIdAndUpdate(id,{$pull : {lessons : {id:videoId}}},{upsert:false,new:true})
        res.status(201).json(course)
        return 
    }catch(err){
        res.status(500).json({message:err})
        return 
    }
}