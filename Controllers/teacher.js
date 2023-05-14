import Teacher from '../Models/Teacher.js'
import Users from '../Models/Users.js';

export const createteacher = async(req,res,next)=>{
    try{
        const user = await Users.findById(req.user.id);
        user.isTeacher = true;
        await user.save()
        const teacher = new Teacher({
            profession:req.body.profession,
            bio:req.body.bio,
            userdata:req.user.id,
            video:req.body.demovideo
        })
        await teacher.save();
        return res.status(200).json(teacher)
    }catch(err){
        return res.status(400).json(err);
    }
}

export const getTeacherData = async(req,res,next) =>{
    try{
        const teacher = await Teacher.findById(req.teacher.id)
        return res.status(200).json(teacher)
    }catch(err){
        return res.status(500).json(err);
    }
}
