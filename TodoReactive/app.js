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