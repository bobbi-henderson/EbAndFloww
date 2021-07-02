const mongoose = require('mongoose')

const ArtSchema = new mongoose.Schema({
  name: {type: String},
  images: {type: Array},
  desc: {type: String},
  price: {type: Number},
  link: {type: String},
  series: {type: String},
  date: {type: Date, default: Date.now},
  sold: {type: Boolean, default: false},
})

ArtSchema.index({'$**': 'text'})

module.exports = mongoose.model('Art', ArtSchema)