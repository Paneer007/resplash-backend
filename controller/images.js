require('dotenv').config()
const imageRouter = require('express').Router()
const Image= require('../model/Image')
const multer=require('multer')
const bcrypt = require('bcrypt')
const fileUpload=multer()
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
const streamifier=require('streamifier')
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET, 
  });
imageRouter.get('/',async (req,res)=>{
    try{
        const result =  await Image.find({})
        res.send(result)
    }catch{
        null
    }
})
imageRouter.delete('/delete',async (req,res)=>{
    const {password,id}=req.body
    console.log(password)
    const result = await Image.findById(id)
    const hashPass= result.password
    console.log(hashPass)
    const comparisonResult = await bcrypt.compare(password,hashPass);
    console.log(comparisonResult)
    if(comparisonResult){
        const result = await Image.deleteOne({_id:id})
        res.status(200).send('sent')
    }else{
        res.status(404).send({error:"Not found"})
    }
    res.send('receicver')
})
imageRouter.post('/upload',fileUpload.single('file'),(req,res,next)=>{
    let streamUpload = (req)=>{
        return new Promise((resolve,reject)=>{
            let stream = cloudinary.uploader.upload_stream(
                      (error, result) => {
                        if (result) {
                          resolve(result);
                        } else {
                          reject(error);
                        }
                      }
            )
            streamifier.createReadStream(req.file.buffer).pipe(stream)
        })
    }
    async function upload(req){
        try{
            console.log(req.body.password)
            const saltround=10
            let result = await streamUpload(req)
            console.log(0)
            const passwordHash= await bcrypt.hash(req.body.password,saltround)
            console.log(2)
            const userImage = await new Image({link:result.secure_url,password:passwordHash,Date:new Date(),label:req.body.label})
            console.log(4)
            const finalResult = await userImage.save()
            res.status(200).send('done :D')
        }catch{
            res.status(500).send('error')
        }
    }
    upload(req)
})
module.exports=imageRouter