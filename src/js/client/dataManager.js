class DataManager {
  constructor(http, pubsub) {
    this.initalData = []
    this.http = http
    this.pubsub = pubsub
  }

  getData() {
    return this.initalData
  }

  login(username, password) {
    this.http.post('http://localhost:3000/login/', { username, password })
      .then((user) => {
        if (user.success) {
          this.pubsub.publish('loggedInUser', user.data)
        } else {
          this.pubsub.publish('loginFailed')
        }
      })
      .catch(e => this.pubsub.publish('loginFailed', e))
  }

  register(username, password) {
    this.http.post('http://localhost:3000/register/', { username, password })
      .then((user) => {
        if (user.success) {
          this.pubsub.publish('loggedInUser', user.data)
        } else {
          this.pubsub.publish('usernameExists')
        }
      })
      // .catch(e => this.pubsub.publish('loginFailed', e))
  }

  addTaskToData(caption, userId, token) {
    this.http.post('http://localhost:3000/tasks/', { caption, userId }, token)
      .then(addedTask => this.pubsub.publish('taskAdded', addedTask))
      .catch(e => this.pubsub.publish('Error', e))
  }

  removeDataItem(id, token) {
    this.http.delete(`http://localhost:3000/tasks/${id}`, token)
      .then(removedItem => this.pubsub.publish('removedTask', removedItem))
      .catch(e => this.pubsub.publish('Error', e))
  }

  updateTask(input, taskObj, token) {
    taskObj.caption = input
    this.http.put('http://localhost:3000/tasks/', taskObj, token)
      .then(updatedItem => this.pubsub.publish('taskUpdated', updatedItem))
      .catch(e => this.pubsub.publish('Error', e))
  }

  checkBoxToggler(taskObj, token) {
    if (taskObj.completed) {
      taskObj.completed = false
    } else {
      taskObj.completed = true
    }
    this.http.put('http://localhost:3000/tasks/', taskObj, token)
      .then(checkedItem => this.pubsub.publish('checkBoxToggled', checkedItem))
      .catch(e => this.pubsub.publish('Error', e))
  }

  clearData(token) {
    this.http.delete('http://localhost:3000/remove-all-tasks', token)
      .then(this.pubsub.publish('tasksCleared'))
      .catch(e => this.pubsub.publish('Error', e))
  }
}

export default DataManager
