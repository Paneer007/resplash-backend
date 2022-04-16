const imageRouter = require('express').Router()
const Image= require('../model/Image')
const mongoose = require('mongoose')
imageRouter.get('/',(req,res)=>{
    try{
        const result =  await Image.find({})
        console.log(result)
    }catch{
        null
    }
})
imageRouter.post('/photos',(req,res)=>{

})
module.exports=imageRouter