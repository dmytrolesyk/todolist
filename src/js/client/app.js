import http from './http'
import pubsub from './pubsub'
import DataManager from './dataManager'
import Form from './form'
import App from './components/appcomp'

const dataManager = new DataManager(http, pubsub)

const init = () => {
  const rootNode = document.getElementById('root')
  if (!localStorage.getItem('user')) {
    const form = new Form(rootNode, dataManager)

    form.render()

    pubsub.subscribe('loggedInUser', (user) => {
      localStorage.setItem('user', JSON.stringify(user))
      const app = new App(rootNode, dataManager, user)
      dataManager.http.get(`http://localhost:3000/tasks/${user.userId}`, `Bearer ${user.token}`)
        .then((tasks) => {
          dataManager.initialData = []
          dataManager.initialData.push(...tasks)
          app.render()
        })
    })
  } else {
    const user = JSON.parse(localStorage.getItem('user'))
    const app = new App(rootNode, dataManager, user)
    dataManager.http.get(`http://localhost:3000/tasks/${user.userId}`, `Bearer ${user.token}`)
      .then((tasks) => {
        dataManager.initialData = []
        dataManager.initialData.push(...tasks)
        app.render()
      })
  }
}

pubsub.subscribe('loggedOut', init)

document.addEventListener('DOMContentLoaded', init)
