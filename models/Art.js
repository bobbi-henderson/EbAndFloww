const mongoose = require('mongoose')

const ArtSchema = new mongoose.Schema({
  name: {type: String},
  image: {type: String},
  cloudinaryID: {type: String},
  desc: {type: String},
  date: {type: Date, default: Date.now},
  sold: {type: Boolean, default: false},
})

ArtSchema.index({'$**': 'text'})

module.exports = mongoose.model('Art', ArtSchema)