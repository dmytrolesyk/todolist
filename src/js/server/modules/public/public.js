const Router = require('koa-router')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserModel = require('../../db/models/user')
const authenticate = require('../auth')

const publicRoutes = new Router()

const register = async (ctx) => {
  const { username, password } = ctx.request.body
  const existingUser = await UserModel.find({ username })
  if (existingUser.username) {
    ctx.body = {
      success: false,
      data: {},
    }
  } else {
    const newUser = new UserModel({
      username,
      password,
    })
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newUser.password, salt)
    newUser.password = hash
    const user = await newUser.save()
    const signData = {
      username: user.username,
      userId: user._id,
    }
    const token = jwt.sign(JSON.stringify(signData), 'secret')
    ctx.body = {
      success: true,
      data: {
        username: user.username,
        token,
        userId: user._id,
      },
    }
  }
}

const login = async (ctx) => {
  try {
    const { username, password } = ctx.request.body
    const user = await authenticate(username, password)
    const signData = {
      username: user.username,
      userId: user._id,
    }
    const token = jwt.sign(JSON.stringify(signData), 'secret')
    ctx.body = {
      success: true,
      data: {
        username: user.username,
        token,
        userId: user._id,
      },
    }
  } catch (error) {
    ctx.body = {
      success: false,
      data: {},
    }
  }
}

publicRoutes.post('/register', register)

publicRoutes.post('/login', login)

module.exports = publicRoutes
