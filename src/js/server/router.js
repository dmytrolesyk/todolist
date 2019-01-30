const Router = require('koa-router')

const router = new Router()

const { tasks, Task, generateId } = require('./data.js')

router.get('/tasks', async (ctx) => {
  ctx.body = tasks
})

router.get('/tasks/:id', async (ctx) => {
  const id = parseInt(ctx.params.id, 10)
  const taskItem = tasks.find(item => item.id === id)
  ctx.body = taskItem
})

router.post('/tasks', async (ctx) => {
  const { caption } = ctx.request.body
  const newTask = new Task(generateId(), caption, false)
  tasks.push(newTask)
  ctx.body = newTask
})

router.delete('/tasks/:id', async (ctx) => {
  const id = parseInt(ctx.params.id, 10)
  const index = tasks.findIndex(task => task.id === id)
  const deletedItem = tasks.splice(index, 1)[0]
  ctx.body = deletedItem
})

router.put('/tasks', async (ctx) => {
  const updatedItem = ctx.request.body
  const index = tasks.findIndex(task => task.id === updatedItem.id)
  tasks[index] = updatedItem
  ctx.body = updatedItem
})

router.delete('/remove-all-tasks', async (ctx) => {
  tasks.length = 0
  ctx.body = []
})


module.exports = router
