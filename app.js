require('dotenv').config
const express = require('express')
const cors = require('cors')
const app= express()
const imageRouter = require('./controller/images')
app.use(express.json())
app.use(cors())
app.use(imageRouter())
module.exports=app