const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  first: {type: String},
  last: {type: String},
  email: { type: String, unique: true },
  password: String
})
 
AdminSchema.pre('save', function save(next) {
  const user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})

AdminSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

module.exports = mongoose.model('User', AdminSchema)