const generateTocken = require('../utils/generateTocken');
const asynchandler = require('express-async-handler');
const CompanyModel=require('../models/companyModel')
const UserModel=require('../models/userModel')
const jwt=require('jsonwebtoken')


const adminLogin= async (req,res)=>{
    const {admin,adminpassword}=req.body
    if(admin==="admin" && adminpassword==="123"){
        const tocken=generateTocken("admin")
        res.status(201).json({
            admin:admin,
            adminTocken:tocken
        })
    }else{
        res.status(400).json({
            errorMessage:"Admin login failed" 
        })
    }

}
const adminUserList=async(req,res)=>{
    const usersList=await UserModel.find({userRoll:"user"})
    if(usersList){
        res.status(200).json(usersList)
    }else{
        res.status(400).json({message:'Manager List error'})
        
    }
}

const adminVendorList=async(req,res)=>{
    const companyList=await CompanyModel.find()
    if(companyList){
        res.status(200).json(companyList)
    }else{
        res.status(400).json({message:'Company List error'})
        
    }
}

const adminManagerList=async(req,res)=>{
    const managerList=await UserModel.find({userRoll:"manager"})
    if(managerList){
        res.status(200).json(managerList)
    }else{
        res.status(400).json({message:'User List error'})
        
    }
}

const adminDeleteUser = async (req,res)=>{
    const userId=req.params.id;
    await UserModel.findByIdAndDelete(userId).then((data)=>{
        res.status(204).json({data})
    }).catch((err)=>{
        res.status(400).json({message:'Failed to delete'})
    })
}

const adminChangeUserStatus=async (req,res)=>{
    const userId=req.params.id
    let status=req.params.status
    
    if(status==='true'){
        status=false
    }else{
        status=true
    }
    await UserModel.findByIdAndUpdate(userId,{blocked:status}).then((data)=>{
        res.status(200).json({data})
    }).catch((err)=>{
        res.status(400).json({message:'Updation Failed'})
    })
}

const adminDeleteVendor=async (req,res)=>{
    const companyId=req.params.id;
    await CompanyModel.findByIdAndDelete(companyId).then((data)=>{
        res.status(204).json({data})
    }).catch((err)=>{
        res.status(400).json({message:'Failed to delete'})
    })
}

const adminChangeVendorStatus=async(req,res)=>{
    const companyId=req.params.id 
    let status=req.params.status 
     
    if(status==='true'){
        status=false
    }else{
        status=true
    }
    await CompanyModel.findByIdAndUpdate(companyId,{blocked:status}).then((data)=>{
        res.status(200).json({data})
    }).catch((err)=>{
        res.status(400).json({message:'Updation Failed'})
    })
}

const adminTockenValidator=async(req,res)=>{
    const jwtAdminTocken=req.body.adminTocken
    console.log(jwtAdminTocken);
    const verified=jwt.verify(jwtAdminTocken,process.env.JWT_KEY)
    if(verified){
        res.status(201).json({
            admin:"admin" 
        })
    }else{
        res.status(400).json({
            message:'Validation Failed' 
        })
    }
    
    
}

module.exports={
    adminLogin,
    adminUserList,
    adminVendorList,
    adminManagerList,
    adminDeleteUser,
    adminChangeUserStatus,
    adminDeleteVendor,
    adminChangeVendorStatus,
    adminTockenValidator
};