class DataManager {
  constructor(http) {
    this.initalData = []
    this.http = http
    this.pubsub = new Pubsub()
  }

  getData() {
    return this.initalData
  }

  addTaskToData(caption) {
    this.http.post('http://localhost:3000/tasks/', { caption })
      .then(addedTask => this.pubsub.publish('taskAdded', addedTask))
  }

  removeDataItem(id) {
    this.http.delete(`http://localhost:3000/tasks/${id}`)
      .then(removedItem => this.pubsub.publish('removedTask', removedItem[0]))
  }

  updateTask(input, taskObj) {
    taskObj.caption = input
    this.http.put('http://localhost:3000/tasks/', taskObj)
      .then(updatedItem => this.pubsub.publish('taskUpdated', updatedItem))
  }

  async checkBoxToggler(taskObj) {
    if (taskObj.completed) {
      taskObj.completed = false
    } else {
      taskObj.completed = true
    }
    try {
      const checkedItem = await this.http.put('http://localhost:3000/tasks/', taskObj)
      this.pubsub.publish('checkBoxToggled', checkedItem)
    } catch (e) {
      console.log(e)
    }
  }

  clearData() {
    this.http.delete('http://localhost:3000/remove-all-tasks')
      .then(this.pubsub.publish('tasksCleared'))
  }
}
