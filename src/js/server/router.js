const Router = require('koa-router')
// const UserModel = require('./db/models/user')
const TaskModel = require('./db/models/task')

const router = new Router()

router.get('/tasks', async (ctx) => {
  ctx.body = await TaskModel.find({})
})

router.get('/tasks/:id', async (ctx) => {
  const { id } = ctx.params
  const taskItem = await TaskModel.find({ _id: id })
  ctx.body = taskItem
})

router.post('/tasks', async (ctx) => {
  const { caption } = ctx.request.body
  const task = TaskModel({
    caption,
    completed: false,
  })
  ctx.body = await task.save()
})

router.delete('/tasks/:id', async (ctx) => {
  const { id } = ctx.params
  const deletedItem = await TaskModel.findOneAndDelete({ _id: id })
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


module.exports = router
