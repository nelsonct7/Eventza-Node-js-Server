const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')


const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const vendorRouter= require('./routes/vendors')
const managerRouter= require('./routes/manager')
const postRouter= require('./routes/post')
const connectDB=require('./config/mongooseconnection')

require('dotenv').config()
connectDB()

// const db=require('./config/connection')


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())


app.use('/user', usersRouter);
app.use('/admin', adminRouter);
app.use('/vendor', vendorRouter);
app.use('/manager', managerRouter);
app.use('/post', postRouter);

// db.connect((err)=>{
//     if(err){
//       console.log("DB Connection error"+err);
//     }
//     else{
//       console.log("DB Connected Successfully....");
//     }
//   })

module.exports = app;
