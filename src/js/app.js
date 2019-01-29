const rootNode = document.getElementById('root')

const app = new App(rootNode)

const render = () => {
  app.dataManager.http.get('http://localhost:3000/tasks')
    .then((tasks) => {
      app.dataManager.initalData.push(...tasks)
      app.render()
    })
}

document.addEventListener('DOMContentLoaded', render)
