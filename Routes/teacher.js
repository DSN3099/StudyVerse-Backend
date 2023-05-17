import express from 'express';
import {verifytoken} from './VerifyToken.js';
import { createteacher,getTeacherData, updateTeacher } from '../Controllers/teacher.js';
const router = express.Router();

router.post('/createteacher',verifytoken,createteacher)
router.patch('/updateteacher',verifytoken,updateTeacher)
router.get('/teacherdata',verifytoken,getTeacherData)
export default router;