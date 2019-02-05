const Router = require('koa-router')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const UserModel = require('../db/models/user')
const TaskModel = require('../db/models/task')
const authenticate = require('../auth')

const router = new Router()

router.get('/tasks/:user', async (ctx) => {
  const { user } = ctx.params
  ctx.body = await TaskModel.find({ author: user })
})

router.get('/tasks/:id', async (ctx) => {
  const { id } = ctx.params
  const taskItem = await TaskModel.find({ _id: id })
  ctx.body = taskItem
})

router.post('/tasks', async (ctx) => {
  const { caption, userId } = ctx.request.body
  const task = TaskModel({
    caption,
    completed: false,
    author: userId,
  })
  const user = await UserModel.findOne({ _id: userId })
  const taskId = task._id
  user.tasks.push(taskId)
  await user.save()
  ctx.body = await task.save()
})

router.delete('/tasks/:id', async (ctx) => {
  const { id } = ctx.params
  const deletedItem = await TaskModel.findOneAndDelete({ _id: id })
  const user = await UserModel.findOne({ _id: deletedItem.author })

  const { ObjectId } = mongoose.Types
  user.tasks.splice(user.tasks.indexOf(ObjectId(id)), 1)
  await user.save()
  ctx.body = deletedItem
})

router.put('/tasks', async (ctx) => {
  const updatedItem = ctx.request.body
  ctx.body = await TaskModel.findOneAndUpdate({ _id: updatedItem._id },
    updatedItem, { new: true })
})

router.delete('/remove-all-tasks', async (ctx) => {
  await TaskModel.deleteMany({})
  ctx.body = []
})

router.post('/register', async (ctx) => {
  const { username, password } = ctx.request.body
  const existingUser = await UserModel.find({ username })
  if (existingUser) {
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
    const token = jwt.sign(user.toJSON(), 'secret')
    ctx.body = {
      success: true,
      data: {
        username: user.username,
        token,
        userId: user._id,
      },
    }
  }
})

router.post('/login', async (ctx) => {
  try {
    const { username, password } = ctx.request.body
    const user = await authenticate(username, password)
    const token = jwt.sign(user.toJSON(), 'secret')
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
})


module.exports = router
