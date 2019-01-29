const tasks = []

class Task {
  constructor(id, caption, completed) {
    this.id = id
    this.caption = caption
    this.completed = completed
  }
}

function generateId() {
  let id
  if (tasks.length) {
    id = tasks[tasks.length - 1].id + 1
  } else {
    id = 0
  }
  return id
}

module.exports.tasks = tasks
module.exports.Task = Task
module.exports.generateId = generateId
