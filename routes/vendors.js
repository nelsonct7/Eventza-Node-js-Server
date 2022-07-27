const express = require('express');
const router = express.Router();
const {authCompany,registerCompany,tockenValidator}=require('../controllers/vendorcontroller')

router.route('/login').post(authCompany)
router.route('/signup').post(registerCompany)
router.route('/tockenvalidator').post(tockenValidator)

module.exports = router;