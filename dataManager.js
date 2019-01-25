class Task {
    constructor(id, caption, completed) {
        this.id = id;
        this.caption = caption;
        this.completed = completed;
    }
}

class DataManager {
    constructor() {
        //this.data = !localStorage.getItem('tasks') ? [] : JSON.parse(localStorage.getItem('tasks'));
        this.data = !localStorage.getItem('tasks') ? [] : JSON.parse(localStorage.getItem('tasks'));
        this.changeListeners = {};
        this.getDataItem = this.getDataItem.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.publish = this.publish.bind(this);
        this.clearData = this.clearData.bind(this);
        this.addDataToStorage = this.addDataToStorage.bind(this);
        window.addEventListener('unload', this.addDataToStorage);
    }

    subscribe(topic, callback, pars) {

        this.changeListeners[topic] = {};
            this.changeListeners[topic].listener = callback;
            if(typeof pars !=='undefined') {
                this.changeListeners[topic].parameters = [...pars];
            }
    }

    publish(topic) {
		if(typeof this.changeListeners[topic].parameters !== 'undefined') {
			this.changeListeners[topic].listener(...this.changeListeners[topic].parameters);
		} else {
			this.changeListeners[topic].listener();
		}
	}
 
    getData() {
        return this.data;
    }

    generateId() {
        let id;
        if(this.data.length) {
            id = this.data[this.data.length - 1].id + 1;
        } else {
            id = 0;
        }
        return id;
    }

    addTaskToData(caption, completed) {
        const id = this.generateId();
        const newTask = new Task(id, caption, completed);
        this.data.push(newTask);
        this.publish('renderTasks');
    }

    addDataToStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.data));
    }

    removeDataItem(index) {
        
        this.data.splice(index, 1);
        this.publish('renderTasks');
    }

    checkBoxToggler(id) {
       
        const task = this.getDataItem(id);
        if(task.completed) {
            task.completed = false;
        } else {
            task.completed = true;
        }
        this.publish('renderTasks');
    }

    clearData() {
        this.data = [];
        this.publish('renderApp');
    }

    getDataItem(elementId) {
        let dataItem;
        this.data.forEach(function(item) {
            if(item.id === elementId) {
                dataItem = item;
            }
        });
        return dataItem;
    }

    getIndexById(id) {
        let index;
        dataManager.data.forEach(function(dataItem, ind){
            if(dataItem.id === id) {
                index = ind;
            }
        });
        return index;
    }
}