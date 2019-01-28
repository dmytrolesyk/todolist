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
        this.pubsub = new Pubsub();
        this.getDataItem = this.getDataItem.bind(this);
        this.clearData = this.clearData.bind(this);
        this.addDataToStorage = this.addDataToStorage.bind(this);
        window.addEventListener('unload', this.addDataToStorage);
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
        this.pubsub.publish('taskAdded', newTask);
    }

    addDataToStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.data));
    }

    removeDataItem(index) {
        
        const removedItem = this.data.splice(index, 1)[0];
        this.pubsub.publish('removedTask', removedItem);
    }

    updateTask(input, itemToUpdate) {
        itemToUpdate.caption = input;
        this.pubsub.publish('taskUpdated', itemToUpdate);
    }

    checkBoxToggler(id) {
       
        const checkedItem = this.getDataItem(id);
        if(checkedItem.completed) {
            checkedItem.completed = false;
        } else {
            checkedItem.completed = true;
        }
        this.pubsub.publish('checkBoxToggled', checkedItem);
    }

    clearData() {
        this.data = [];
        this.pubsub.publish('tasksCleared');
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
        this.data.forEach(function(dataItem, ind){
            if(dataItem.id === id) {
                index = ind;
            }
        });
        return index;
    }
}