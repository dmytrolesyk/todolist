// (function(){

//     const dataManager = new DataManager();
//     const tasks = new Tasks(dataManager);
//     const app = new App(tasks);

//     app.render(document.getElementById('root'));

// })();

const rootNode = document.getElementById('root');

const dataManager = new DataManager();
const tasks = new Tasks(dataManager);
const app = new App(rootNode, tasks, dataManager);

app.render();

const tasksNode = document.getElementById('tasksNode');

dataManager.subscribe('renderTasks', tasks.render, [tasksNode, app.setEditState]);
dataManager.subscribe('renderApp', app.render);