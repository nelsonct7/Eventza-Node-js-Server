const mongoClient=require('mongodb').MongoClient;
const state={
    db:null
}
module.exports.connect=function(done){
    const url=process.env.DB_URL || 'mongodb://localhost:27017'
    const dbname='eventza'//database name
mongoClient.connect(url,(err,data)=>{
    if(err) {return done(err)}
    
        state.db=data.db(dbname)
        done()
 
})
}
module.exports.get=function(){ 
    return state.db
}