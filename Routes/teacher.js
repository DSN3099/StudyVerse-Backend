import express from 'express';
import {verifytoken} from './VerifyToken.js';
import { createteacher } from '../Controllers/teacher.js';
const router = express.Router();

router.post('/createteacher',verifytoken,createteacher)
export default router;