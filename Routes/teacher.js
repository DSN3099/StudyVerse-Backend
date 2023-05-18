import express from 'express';
import {verifytoken} from './VerifyToken.js';
import { createteacher,getTeacherData, updateTeacher,getTeachersCourse } from '../Controllers/teacher.js'
const router = express.Router();

router.post('/createteacher',verifytoken,createteacher)
router.patch('/updateteacher',verifytoken,updateTeacher)
router.get('/teacherdata/:id',verifytoken,getTeacherData)
router.get('/teachersCourse',verifytoken,getTeachersCourse)
export default router;