const moongose=require('mongoose')

require("dotenv").config();

const mongodburl=process.env.MONGODBURL

const connectDB=moongose.connect( mongodburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).
then(()=>console.log('database connected now...')).catch((err)=>console.log(err))

module.exports=connectDB
