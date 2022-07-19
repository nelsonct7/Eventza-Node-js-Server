const generateTocken = require('../utils/generateTocken');
const asynchandler = require('express-async-handler');


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

module.exports={
    adminLogin
};