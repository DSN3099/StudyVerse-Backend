import express from 'express'
import { getUserData,uploadImage,deactivateAccount, updateuserdata, addToCart, getCart,deleteCart,emptyCart } from '../Controllers/user.js';
import { verifytoken } from './VerifyToken.js'
const router = express.Router()

router.get('/',verifytoken,getUserData)
router.patch('/uploadImage',verifytoken,uploadImage)
router.delete('/deactivate',verifytoken,deactivateAccount)
router.patch('/updateprofile',verifytoken,updateuserdata)
router.post('/addTocart',verifytoken,addToCart)
router.get('/getCart',verifytoken,getCart)
router.delete('/deleteCart/:id',verifytoken,deleteCart)
router.delete('/emptyCart',verifytoken,emptyCart)
 
export default router;  