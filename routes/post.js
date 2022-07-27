var express = require('express');
var router = express.Router();
const asynchandler =require('express-async-handler');
const jwt=require('jsonwebtoken')

const multer = require("multer");

const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/post-images");
  },
  filename: function (req, file, callback) {
    callback(null, "post_image-" + Date.now() + ".jpeg");
  },
});

const postImgStore = multer({ storage: postStorage });

const {createPost,editPost,deletePost,getPost,changeStatus,getAdminPost}=require('../controllers/postController')


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

router.route('/createpost').post(postImgStore.single("postImage"),createPost) 
router.route('/editpost/:id').patch(postImgStore.single("postImage"),editPost)
router.route('/getpost').get(getPost)
router.route('/deletepost/:id').delete(deletePost)
router.route('/changeStatus/:id/:stat').patch(changeStatus)
router.route('/getadminpost').get(getAdminPost)


module.exports = router;