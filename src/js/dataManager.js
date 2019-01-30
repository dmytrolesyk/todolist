class DataManager {
  constructor(http, pubsub) {
    this.initalData = []
    this.http = http
    this.pubsub = pubsub
  }

  getData() {
    return this.initalData
  }

  addTaskToData(caption) {
    this.http.post('http://localhost:3000/tasks/', { caption })
      .then(addedTask => this.pubsub.publish('taskAdded', addedTask))
      .catch(e => this.pubsub.publish('Error', e))
  }

  removeDataItem(id) {
    this.http.delete(`http://localhost:3000/tasks/${id}`)
      .then(removedItem => this.pubsub.publish('removedTask', removedItem))
      .catch(e => this.pubsub.publish('Error', e))
  }

  updateTask(input, taskObj) {
    taskObj.caption = input
    this.http.put('http://localhost:3000/tasks/', taskObj)
      .then(updatedItem => this.pubsub.publish('taskUpdated', updatedItem))
      .catch(e => this.pubsub.publish('Error', e))
  }

  checkBoxToggler(taskObj) {
    if (taskObj.completed) {
      taskObj.completed = false
    } else {
      taskObj.completed = true
    }
    this.http.put('http://localhost:3000/tasks/', taskObj)
      .then(checkedItem => this.pubsub.publish('checkBoxToggled', checkedItem))
      .catch(e => this.pubsub.publish('Error', e))
  }

  clearData() {
    this.http.delete('http://localhost:3000/remove-all-tasks')
      .then(this.pubsub.publish('tasksCleared'))
      .catch(e => this.pubsub.publish('Error', e))
  }
}

export default DataManager
