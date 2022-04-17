require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app= express()
const imageRouter = require('./controller/images')
const mongoose=require('mongoose')
try{
    const res= mongoose.connect(process.env.MONGODB_URL)
    console.log('connected')
}catch(error){
    console.log(error)
}
app.use(express.json())
app.use(cors())
app.use('/photos',imageRouter)
module.exports=app