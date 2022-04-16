const mongoose = require('mongoose')
const imageModel =  new mongoose.Schema({
    link:String,
    password:String,
    Date: Date,
    label:String
})
module.exports = mongoose.model('Image',imageModel)