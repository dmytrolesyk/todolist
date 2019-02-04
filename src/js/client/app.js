import http from './http'
import pubsub from './pubsub'
import DataManager from './dataManager'
import Form from './form'
import App from './ui'

const dataManager = new DataManager(http, pubsub)

const init = () => {
  const rootNode = document.getElementById('root')
  if (!localStorage.getItem('userId')) {
    const form = new Form(rootNode, dataManager)

    form.render()

    pubsub.subscribe('loggedInUser', (user) => {
      localStorage.setItem('token', user.token)
      localStorage.setItem('userId', user.userId)
      const app = new App(rootNode, dataManager, user.userId)
      dataManager.http.get(`http://localhost:3000/tasks/${user.userId}`)
        .then((tasks) => {
          dataManager.initalData = []
          dataManager.initalData.push(...tasks)
          app.render()
        })
    })
  } else {
    const userId = localStorage.getItem('userId')
    const app = new App(rootNode, dataManager, userId)
    dataManager.http.get(`http://localhost:3000/tasks/${userId}`)
      .then((tasks) => {
        dataManager.initalData = []
        dataManager.initalData.push(...tasks)
        app.render()
      })
  }
}

pubsub.subscribe('loggedOut', init)

document.addEventListener('DOMContentLoaded', init)
