const mongoose=require('mongoose');

const postSchema=mongoose.Schema(
    {   
        postCreator:{
            type:String,
            required:true
        },
        creatorId:{
            type:String,
            required:true
        },
        creatorType:{
            type:String,
            required:true
        },
        post:{
            type:String,
            required:true
        },
        postImage:{
            type:String,
        },
        postDate:{
            type:String,
            required:true
        },
        blocked:{
            type:Boolean,
            default:false
        },
        likes:[
            {
                userId:String
            }
        ]
    },
    {
        timestamps:true
    }
)

const PostModel=mongoose.model('PostModel',postSchema);

module.exports=PostModel 
