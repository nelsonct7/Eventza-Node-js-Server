const express = require('express');
const router = express.Router();
const {adminLogin,adminUserList,adminVendorList,adminManagerList,adminDeleteUser,adminChangeUserStatus,adminDeleteVendor,adminChangeVendorStatus} = require('../controllers/admincontroller')


router.route('/login').post(adminLogin)
router.route('/userlist').get(adminUserList)
router.route('/managerlist').get(adminManagerList)
router.route('/deleteuser/:id').delete(adminDeleteUser)
router.route('/changestatus/:id/:status').patch(adminChangeUserStatus)
router.route('/vendorlist').get(adminVendorList)
router.route('/deletevendor/:id').delete(adminDeleteVendor)
router.route('/changevendorstatus/:id/:status').patch(adminChangeVendorStatus)

module.exports = router;
