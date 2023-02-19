import Course from '../Models/Course.js'
import Lesson from '../Models/Lesson.js'

export const getCourse = async (req, res) => {
    try {
      const getCourse = await Course.findById(req.params.id)
      if (!getCourse) res.status(404).send('Course not found...')
      res.status(200).json(getCourse)
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }

export const addVideos = async (req,res) =>{
    try{
        const course = await Course.findById(req.params.id)
        // course.lessons.push(req.body)
        course.updateOne({$push:{lessons:req.body}})
        console.log(course)
    }catch(err){
        res.status(500).json({message: err})
    }
}