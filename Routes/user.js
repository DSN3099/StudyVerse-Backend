import express from 'express'
import { getUserData,uploadImage,deactivateAccount, updateuserdata } from '../Controllers/user.js';
import { verifytoken } from './VerifyToken.js'
const router = express.Router()

router.get('/',verifytoken,getUserData)
router.patch('/uploadImage',verifytoken,uploadImage)
router.delete('/deactivate',verifytoken,deactivateAccount)
router.patch('/updateprofile',verifytoken,updateuserdata)
 
export default router;  