import Teacher from '../Models/Teacher.js'
import Users from '../Models/Users.js';

export const createteacher = async(req,res,next)=>{
    try{
        const user = await Users.findById(req.user.id);
        user.isTeacher = true;
        const teacher = await Teacher.findById(user.teacherData._id)
        teacher.profession = req.body.profession
        teacher.bio = req.body.bio
        teacher.video = req.body.video
        await teacher.save();
        user.teacherData = teacher._id
        await user.save()
        return res.status(200).json(user)
    }catch(err){
        return res.status(400).json(err);
    }
}

export const updateTeacher = async(req,res,next)=>{
    try{
        const user = await Users.findById(req.user.id);
        const teacher = await Teacher.findById(user.teacherData._id)
        teacher.profession = req.body.profession
        teacher.bio = req.body.bio
        await teacher.save();
        return res.status(200).json(user)
    }catch(err){
        return res.status(400).json(err);
    }
}

export const getTeacherData = async(req,res,next) =>{
    const {id} = req.params
    try{
        const user = await Users.findById(id).populate({
            path:'teacherData',
            populate:{ path : 'courses'}
        })
        return res.status(200).json(user)
    }catch(err){
        return res.status(500).json(err);
    }
}

export const getTeachersCourse = async(req,res,next) =>{
    try{
        const {teacherData} = await Users.findById(req.user.id)
        const {courses} = await Teacher.findById(teacherData).populate('courses')
        return res.status(200).json(courses)
    }catch(err){
        return res.status(500).json(err);
    }
}