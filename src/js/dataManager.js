class DataManager {
    constructor() {
        this.initalData = [];
        this.http = new HTTP();
        this.pubsub = new Pubsub();
        this.getDataItem = this.getDataItem.bind(this);
        this.clearData = this.clearData.bind(this);
    }

    getData() {
        return this.initalData;
    }


    addTaskToData(caption) {
        this.http.post('http://localhost:3000/tasks/', {caption: caption})
            .then(addedTask => this.pubsub.publish('taskAdded', addedTask));
    }

    removeDataItem(id) {
        
        this.http.delete(`http://localhost:3000/tasks/${id}`)
            .then(removedItem => this.pubsub.publish('removedTask', removedItem[0]));
    }

    updateTask(input, taskObj) {
        taskObj.caption = input;
        this.http.put('http://localhost:3000/tasks/', taskObj)
            .then(updatedItem => this.pubsub.publish('taskUpdated', updatedItem));

    }

    checkBoxToggler(taskObj) {
       
        if(taskObj.completed) {
            taskObj.completed = false;
        } else {
            taskObj.completed = true;
        }
        this.http.put('http://localhost:3000/tasks/', taskObj)
            .then(checkedItem => this.pubsub.publish('checkBoxToggled', checkedItem));
    }

    async clearData() {
        const tasks = await this.http.get('http://localhost:3000/tasks')
        await tasks.forEach((taskItem) => this.http.delete(`http://localhost:3000/tasks/${taskItem.id}`))
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

}