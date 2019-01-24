class Task {
    constructor(id, caption, completed) {
        this.id = id;
        this.caption = caption;
        this.completed = completed;
    }
}

class DataManager {
    constructor() {
        this.data = !localStorage.getItem('tasks') ? [] : JSON.parse(localStorage.getItem('tasks'));
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
    }

    addDataToStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.data));
    }

    removeDataItem(index) {
        this.data.splice(index, 1);
    }

    clearData() {
        this.data = [];
    }

    getDataItem(elementId) {
        let dataItem;
        this.data.forEach(function(item) {
            if(item.id === elementId) {
                console.log(item);
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