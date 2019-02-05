const Router = require('koa-router')
const koajwt = require('koa-jwt')

const mongoose = require('mongoose')
const UserModel = require('../../db/models/user')
const TaskModel = require('../../db/models/task')

const secureRoutes = new Router()

secureRoutes.use(koajwt({ secret: 'secret' }))

const getUserTasks = async (ctx) => {
  const { user } = ctx.params
  ctx.body = await TaskModel.find({ author: user })
}

const getSingleTask = async (ctx) => {
  const { id } = ctx.params
  const taskItem = await TaskModel.find({ _id: id })
  ctx.body = taskItem
}

const addNewTask = async (ctx) => {
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
}

const deleteTask = async (ctx) => {
  const { id } = ctx.params
  const deletedItem = await TaskModel.findOneAndDelete({ _id: id })
  const user = await UserModel.findOne({ _id: deletedItem.author })

  const { ObjectId } = mongoose.Types
  user.tasks.splice(user.tasks.indexOf(ObjectId(id)), 1)
  await user.save()
  ctx.body = deletedItem
}

const updateTask = async (ctx) => {
  const updatedItem = ctx.request.body
  ctx.body = await TaskModel.findOneAndUpdate({ _id: updatedItem._id },
    updatedItem, { new: true })
}

const deleteAllTasks = async (ctx) => {
  await TaskModel.deleteMany({})
  ctx.body = []
}

secureRoutes.get('/tasks/:user', getUserTasks)

secureRoutes.get('/tasks/:id', getSingleTask)

secureRoutes.post('/tasks', addNewTask)

secureRoutes.delete('/tasks/:id', deleteTask)

secureRoutes.put('/tasks', updateTask)

secureRoutes.delete('/remove-all-tasks', deleteAllTasks)

module.exports = secureRoutes
