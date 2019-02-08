import { JSDOM } from 'jsdom'

import App from '../components/appcomp'
import pubsub from '../pubsub'
import http from '../http'
import DataManager from '../dataManager'

const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

const initData = [
  { _id: 0, caption: 'task 1', completed: false },
  { _id: 1, caption: 'task 2', completed: false },
  { _id: 2, caption: 'task 3', completed: true },
]

let dataManager
let app

describe('ui testing', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>'
    const rootNode = document.getElementById('root')
    dataManager = new DataManager(http, pubsub)

    dataManager.initalData.push(...initData)
    const user = {
      username: 'Kevin',
      userId: 1,
      token: 'token',
    }
    app = new App(rootNode, dataManager, user)
    app.render()
  })

  test('instatiates app with all the attributes', () => {
    expect(Object.prototype.hasOwnProperty.call(app, 'editState')).toBeTruthy()
    expect(Object.prototype.hasOwnProperty.call(app, 'dataManager')).toBeTruthy()
    expect(Object.prototype.hasOwnProperty.call(app, 'node')).toBeTruthy()
    expect(Object.prototype.hasOwnProperty.call(app, 'currentTask')).toBeTruthy()
    expect(Object.prototype.hasOwnProperty.call(app, 'user')).toBeTruthy()
    expect(Object.prototype.hasOwnProperty.call(app, 'token')).toBeTruthy()
  })

  test('has static filterTasks method', () => {
    expect(Object.prototype.hasOwnProperty.call(App, 'filterTasks')).toBeTruthy()
  })

  test('the name of the user is displayed correctly', () => {
    const greeting = document.querySelector('.greeting').textContent
    expect(greeting).toBe('Hello, Kevin')
  })

  test('tasks added', () => {
    expect(document.querySelector('.task-collection').children.length).toBe(3)
  })

  test('task item is added with the correct text', () => {
    const taskItemTextContent = document.querySelector('.task-item').childNodes[0].data
    expect(taskItemTextContent).toBe('task 1')
  })

  test('completed task is crossed out', () => {
    const completedTask = document.querySelector('.task-item:last-child').classList.contains('completed-task')
    expect(completedTask).toBeTruthy()
  })

  test('logout button click', () => {
    const logoutBtn = document.querySelector('.logout-btn')
    jest.spyOn(global.localStorage, 'removeItem')
    logoutBtn.click()

    expect(global.localStorage.removeItem).toBeCalledWith('user')
  })

  test('Add task button click invokes dataManager.addTaskToData with the correct params', () => {
    const addTaskInput = document.querySelector('input[placeholder="Input your Task"]')
    addTaskInput.value = 'test'
    const addTaskBtn = document.querySelector('input[value="Add Task"]')
    jest.spyOn(app.dataManager, 'addTaskToData')
    addTaskBtn.click()
    expect(app.dataManager.addTaskToData).toBeCalledWith('test', 1, 'Bearer token')
  })

  test('Click on edit button sets task input to the caption of the selected task', () => {
    const editBtn = document.querySelector('.edit-button-icon')
    editBtn.click()
    const addTaskInput = document.querySelector('input[placeholder="Input your Task"]')
    expect(addTaskInput.value).toBe(editBtn.parentElement.childNodes[0].data)
  })

  test('click Update Button invokes dataManager.updateTask method', () => {
    jest.spyOn(app.dataManager, 'updateTask')
    const editBtn = document.querySelector('.edit-button-icon')
    editBtn.click()
    const updateTaskBtn = document.querySelector('input[value="Update Task"]')
    const addTaskInput = document.querySelector('input[placeholder="Input your Task"]')
    addTaskInput.value = 'updated'
    const taskObj = app.currentTask
    updateTaskBtn.click()
    expect(app.dataManager.updateTask).toBeCalledWith('updated', taskObj, 'Bearer token')
  })

  test('Click delete button invokes dataManager.removeDataItem method', () => {
    jest.spyOn(app.dataManager, 'removeDataItem')
    const deleteBtn = document.querySelector('.delete-item-icon:first-child')
    deleteBtn.click()
    expect(app.dataManager.removeDataItem).toBeCalledWith(0, 'Bearer token')
  })

  test('Click on clear button invokes dataManager.clearData method', () => {
    jest.spyOn(app.dataManager, 'clearData')
    const deleteBtn = document.querySelector('.clear-tasks')
    deleteBtn.click()
    expect(app.dataManager.clearData).toBeCalledWith('Bearer token')
  })

  test('checking checkbox dataManager.checkBoxToggler method', () => {
    jest.spyOn(app.dataManager, 'checkBoxToggler')
    const checkBox = document.querySelector('input[type="checkbox"]')
    checkBox.click()
    expect(app.dataManager.checkBoxToggler).toBeCalledWith(app.dataManager.initalData[0], 'Bearer token')
  })
})
