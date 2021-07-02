const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
  title: {type: String},
  image: {type: String},
  cloudinaryID: {type: String},
  body: {type: String},
  date: {type: Date, default: Date.now},
  link: {type: Array}
})

BlogSchema.index({'$**': 'text'})

module.exports = mongoose.model('Blog', BlogSchema)