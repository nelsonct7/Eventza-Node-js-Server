const asynchandler = require('express-async-handler');
const UserModel = require('../models/userModel');
const generateTocken = require('../utils/generateTocken');

const registerUser = asynchandler(async (req, res) => {
    const {
        userName,
        userEmail,
        userPassword,
        userRoll
    } = req.body
    let blocked=false
    userRoll==="manager"?blocked=true:blocked=false

    const userExist = await UserModel.findOne({
        userEmail
    });

    if (userExist) {
        res.status(400)
        throw new Error('User Already exist')
    } else {
        const user = await UserModel.create({
            userName,
            userEmail,
            userPassword,
            userRoll,
            blocked
        })

        if (user) {
            tockenUser=generateTocken(user._id)
            res.cookie('userTocken',tockenUser,{ maxAge: 9000000, httpOnly: false})
            res.status(201).json({
                _id: user._id,
                userName,
                userEmail,
                tocken: tockenUser,
                userRoll
            })
            
        } else {
            res.status(400)
            throw new Error('User not created..')
        }
    }

})

const authUser = asynchandler(async (req, res) => {
    const {
        userEmail,
        userPassword
    } = req.body;
    console.log(JSON.stringify(req.body))
    const user = await UserModel.findOne({
        userEmail
    });
    if (user && user.blocked != true && (await user.matchPassword(userPassword))) {
        tockenUser=generateTocken(user._id)
        res.cookie('userTocken',tockenUser,{ maxAge: 9000000, httpOnly: false})
        res.json({
            userName: user.userName,
            userEmail: user.userEmail,
            _id: user._id,
            tocken: tockenUser,
            userRoll:user.userRoll
        })
        } else {
        res.status(400)
        throw new Error('Invalid User')
    }

})


module.exports = {
    registerUser,
    authUser
};