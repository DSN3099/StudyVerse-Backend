import Course from '../Models/Course.js'

export const addVideos = async (req,res) =>{
    try{
        const course = await Course.findById(req.params.id)
        course.lessons.push(req.body)
        course.save()
        res.status(202).json(course)
        console.log(course)
    }catch(err){
        res.status(500).json({message: err})
    }
}