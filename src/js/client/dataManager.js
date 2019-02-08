/** @flow */

import type { HTTPClient } from './http'
import { Pubsub } from './pubsub'

class DataManager {
  initialData: Array<{ _id: string, caption: string, }>

  http: HTTPClient

  pubsub: Pubsub

  constructor(http: HTTPClient, pubsub: Pubsub) {
    this.initialData = []
    this.http = http
    this.pubsub = pubsub
  }

  getData() {
    return this.initialData
  }

  login(username: string, password: string): void {
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

  register(username: string, password: string): void {
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

  addTaskToData(caption: string, userId: string, token: string): void {
    this.http.post('http://localhost:3000/tasks/', { caption, userId }, token)
      .then(addedTask => this.pubsub.publish('taskAdded', addedTask))
      .catch(e => this.pubsub.publish('Error', e))
  }

  removeDataItem(id: string, token: string): void {
    this.http.delete(`http://localhost:3000/tasks/${id}`, token)
      .then(removedItem => this.pubsub.publish('removedTask', removedItem))
      .catch(e => this.pubsub.publish('Error', e))
  }

  updateTask(input: string, taskObj: { _id: string, caption: string, completed: boolean}, token: string): void {
    taskObj.caption = input
    this.http.put('http://localhost:3000/tasks/', taskObj, token)
      .then(updatedItem => this.pubsub.publish('taskUpdated', updatedItem))
      .catch(e => this.pubsub.publish('Error', e))
  }

  checkBoxToggler(taskObj: { _id: string, caption: string, completed: boolean}, token: string): void {
    if (taskObj.completed) {
      taskObj.completed = false
    } else {
      taskObj.completed = true
    }
    this.http.put('http://localhost:3000/tasks/', taskObj, token)
      .then(checkedItem => this.pubsub.publish('checkBoxToggled', checkedItem))
      .catch(e => this.pubsub.publish('Error', e))
  }

  clearData(token: string): void {
    this.http.delete('http://localhost:3000/remove-all-tasks', token)
      .then(this.pubsub.publish('tasksCleared'))
      .catch(e => this.pubsub.publish('Error', e))
  }
}

export default DataManager
