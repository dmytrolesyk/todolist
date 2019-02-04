import http from './http'
import pubsub from './pubsub'
import DataManager from './dataManager'
import Form from './form'
import App from './ui'

const dataManager = new DataManager(http, pubsub)

const rootNode = document.getElementById('root')

const form = new Form(rootNode, dataManager)

form.render()

pubsub.subscribe('loggedInUser', (user) => {
  const app = new App(rootNode, dataManager, user.userId)
  dataManager.http.get(`http://localhost:3000/tasks/${user.userId}`)
    .then((tasks) => {
      dataManager.initalData.push(...tasks)
      app.render()
    })
})
