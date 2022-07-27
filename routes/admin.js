const express = require('express');
const router = express.Router();
const {adminLogin,adminUserList,adminVendorList,adminManagerList,adminDeleteUser,adminChangeUserStatus,adminDeleteVendor,adminChangeVendorStatus,adminTockenValidator} = require('../controllers/admincontroller')
const asynchandler =require('express-async-handler');

const jwt=require('jsonwebtoken')
const verifyAdmin=asynchandler((req,res,next)=>{
   
  const jwtAdminTocken=req.cookies.admintocken
  const verified=jwt.verify(jwtAdminTocken,process.env.JWT_KEY,(err,user)=>{
    if(err){
      res.status(500)
      throw new Error('Tocken miss match')
    }else{
      next()
    }
  })
})

router.route('/login').post(adminLogin)
router.route('/userlist').get(adminUserList)
router.route('/managerlist').get(adminManagerList)
router.route('/deleteuser/:id').delete(adminDeleteUser)
router.route('/changestatus/:id/:status').patch(adminChangeUserStatus)
router.route('/vendorlist').get(adminVendorList)
router.route('/deletevendor/:id').delete(adminDeleteVendor)
router.route('/changevendorstatus/:id/:status').patch(adminChangeVendorStatus)
router.route('/tockenvalidator').post(adminTockenValidator)


module.exports = router;
