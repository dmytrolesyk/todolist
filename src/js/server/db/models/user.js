const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const saltRounds = 10


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // tasks: {

  // },
})

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return next()

  const hash = await bcrypt.hash(this.password + 'secret shit', saltRounds)

  this.password = hash
})

userSchema.methods.comparePasswords = async function comparePasswords(password) {
  const isMatch = await bcrypt.compare(password + 'secret shit', this.password)
  if (isMatch) {
    console.log('It is a correct password')
  } else {
    console.log('The password is incorrect')
  }
}


module.exports = mongoose.model('User', userSchema)

// https://www.youtube.com/watch?v=7nafaH9SddU&t=2s
// https://scotch.io/@ossaijad/how-to-do-join-operations-and-create-links-between-mongodb-collection
// https://solidgeargroup.com/hashing-passwords-nodejs-mongodb-bcrypt
// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
