const express = require('express');
const router = express.Router();
const {authCompany,registerCompany}=require('../controllers/vendorcontroller')

router.route('/login').post(authCompany)
router.route('/signup').post(registerCompany)

module.exports = router;