import Course from "../Models/Course.js";

export const getAllCourse = () =>{

}

export const getCourse = async(req,res) =>{
    try{
        const getCourse = await Course.findById(req.params.id)
        if(!getCourse) res.status(404).send('Course not found...')
        res.status(200).json(getCourse)
    }
    catch(err){
        res.status(500).json({message:err})
    }
}

export const addCourse = async(req,res) =>{
    const newCourse = new Course({
        title:req.body.title,
        ...req.body
    })
    try{
        await newCourse.save()
        res.status(200).send('Course created successfully...')
    }
    catch(err){
        res.status(400).json({message:err})
    }
}

export const updateCourse = () =>{

}