const mongoose =require('mongoose')

const connectDb=async()=>{
    try{
        const conn=await mongoose.connect(process.env.DB_URL,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log('DB Connected Successfully..');
    }catch(err){
        console.log('DB Error.... : '+err);
    }
}

module.exports =connectDb