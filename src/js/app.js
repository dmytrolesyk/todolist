const rootNode = document.getElementById('root');

const app = new App(rootNode);

document.addEventListener('DOMContentLoaded', render);

function render() {
    app.dataManager.http.get('http://localhost:3000/tasks')
        .then(tasks => {
            app.dataManager.data.push(...tasks);
            app.render();
        })
        .catch(err => console.log(err));
}