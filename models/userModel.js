const mongoose=require('mongoose');
const bcrypt=require('bcrypt')

const userSchema=mongoose.Schema(
    {
        userName:{
            type:String,
            required:true
        },
        userEmail:{
            type:String,
            required:true,
            unique:true
        },
        userPassword:{
            type:String,
            required:true
        },
        blocked:{
            type:Boolean,
            required:true,
            default:false
        },
        userRoll:{
            type:String,
            required:true,
            default:"user",

        },
        profilepic:[
            {
                url:String,
                require:false,
                default:false
            }
        ],
        followers:[{userId:String}],
        following:[{userId:String}],
        posts:[{postId:String}],
        messages:[{MessageId:String}]
    },
    {
        timestamps:true
    }
)

userSchema.pre('save',async function(next){
    if(!this.isModified("userPassword")){
        next() 
    }
    const salt=await bcrypt.genSalt(10);
    this.userPassword=await bcrypt.hash(this.userPassword,salt)
});

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.userPassword)
}

const UserModel=mongoose.model('UserModel',userSchema);

module.exports=UserModel 