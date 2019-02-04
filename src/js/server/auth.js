const bcrypt = require('bcryptjs')
const User = require('./db/models/user')

function authenticate(username, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ username })
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) reject(err)
        if (isMatch) {
          resolve(user)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = authenticate
