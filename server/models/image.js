const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    type: String,
    image: String,
}, {versionKey:false, timestamps:true})

ImageSchema.set('collection', 'images')

module.exports = mongoose.model('Image', ImageSchema)