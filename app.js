const rootNode = document.getElementById('root');

const http = new EasyHTTP();
const dataManager = new DataManager(http);
const tasks = new Tasks(dataManager);
const app = new App(rootNode, tasks, dataManager);

