const mongoose = require ('mongoose')
const bcrypt=require('bcrypt')

const companySchema=mongoose.Schema(
    {
        companyName:{
            type:String,
            required:true
        },
        companyEmail:{
            type:String,
            required:true,
            unique:true
        },
        companyPassword:{
            type:String,
            required:true
        },
        blocked:{
            type:Boolean,
            required:true,
            default:true
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

companySchema.pre('save',async function(next){
    if(!this.isModified("companyPassword")){
        next() 
    }
    const salt=await bcrypt.genSalt(10);
    this.companyPassword=await bcrypt.hash(this.companyPassword,salt)
});

companySchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.companyPassword)
}

const CompanyModel=mongoose.model('CompanyModel',companySchema);

module.exports=CompanyModel 