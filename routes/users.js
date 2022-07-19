var express = require('express');
var router = express.Router();
const asynchandler =require('express-async-handler');
const {registerUser,authUser} = require('../controllers/userController')


const verifyUser=asynchandler((req,res,next)=>{
  
  const jwtUserTocken=req.cookies.userTocken
  const verified=jwt.verify(jwtUserTocken,process.env.JWT_KEY,(err,user)=>{
    if(err){
      res.status(500)
      throw new Error('Tocken miss match')
    }else{
      next()
    }
  })
}) 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/signup').post(registerUser)
router.route('/login').post(authUser)

module.exports = router;
