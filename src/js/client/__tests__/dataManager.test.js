import { JSDOM } from 'jsdom'

import DataManager from '../dataManager'
import http from '../http'
import pubsub from '../pubsub'

jest.mock('../pubsub')

let dataManager

const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

const initData = [
  { _id: 0, caption: 'task 1', completed: false },
  { _id: 1, caption: 'task 2', completed: false },
  { _id: 2, caption: 'task 3', completed: true },
]

describe('dataManager testing', () => {
  beforeEach(() => {
    dataManager = new DataManager(http, pubsub)
    dataManager.initalData.push(...initData)
  })

  test('dataManager.login method invokes dataManager.http.post with the correct values', () => {
    const testUsername = 'username'
    const testPassword = 'password'
    jest.spyOn(dataManager.http, 'post')
    dataManager.login(testUsername, testPassword)
    expect(dataManager.http.post).toBeCalledWith('http://localhost:3000/login/', { username: testUsername, password: testPassword })
  })

  test('dataManager.login method invokes dataManager.pubsub.publish with the correct values', async () => {
    const spiedPost = jest.spyOn(dataManager.http, 'post')
    spiedPost.mockReturnValue(Promise.resolve(
      {
        success: true,
        data: 'data',
      },
    ))
    await dataManager.login('username', 'password')
    expect(dataManager.pubsub.publish).toBeCalledWith('loggedInUser', 'data')
  })

  test('dataManager failed login method invokes dataManager.pubsub.publish with the correct values', async () => {
    const spiedPost = jest.spyOn(dataManager.http, 'post')
    spiedPost.mockReturnValue(Promise.resolve(
      {
        success: false,
        data: 'data',
      },
    ))
    await dataManager.login('username', 'password')
    expect(dataManager.pubsub.publish).toBeCalledWith('loginFailed')
  })
})
