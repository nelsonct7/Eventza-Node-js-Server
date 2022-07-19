var multer=require('multer')

var categoryImages=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'/category-images')
    },filename:(req,file,cb)=>{
        var ext=file.originalname.substr(file.originalname.lastIndexOf('.'))
        cb(null,'category_image-'+Date.now()+ext)
    }
})
store=multer({
    storage:categoryImages
})
module.exports=store