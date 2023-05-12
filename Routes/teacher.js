import express from 'express';
import {createteacher} from '../Controllers/teacher.js';
import {verifytoken} from './VerifyToken.js';
const router = express.Router();

router.post('/updateteacher',verifytoken,createteacher)
// router.get('/teacherdata',verifytoken,getTeacherData)
export default router;

