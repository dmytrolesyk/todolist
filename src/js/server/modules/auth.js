const bcrypt = require('bcryptjs')
const User = require('../db/models/user')

function authenticate(username, password) {
  return new Promise(async (resolve, reject) => {
    const user = await User.findOne({ username })
    if (!user) reject(new Error('User not found'))
    else {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          resolve(user)
        } else {
          reject(new Error('Password is incorrect'))
        }
      })
    }
  })
}

module.exports = authenticate
