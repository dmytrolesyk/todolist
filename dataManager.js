class Task {
    constructor(id, caption, completed) {
        this.id = id;
        this.caption = caption;
        this.completed = completed;
    }
}

class DataManager {
    constructor() {
        this.data = null;
    }
    init() {
        if(!localStorage.getItem('tasks')) {
            this.data = [];
        } else {
            this.data = JSON.parse(localStorage.getItem('tasks'));
        }
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

    addTaskToStorage(caption, completed) {
        const id = this.generateId();
        const newTask = new Task(id, caption, completed);
        this.data.push(newTask);

        localStorage.setItem('tasks', JSON.stringify(this.data));

    }
}