class CreateTask {
    constructor(id, caption, completed) {
        this.id = id;
        this.caption = caption;
        this.completed = completed;
    }
}

function generateId() {
    let id;
    if(this.tasks.length) {
        id = this.tasks[this.tasks.length - 1].id + 1;
    } else {
        id = 0;
    }
    return id;
}


tasks = [];

module.exports.tasks = tasks;
module.exports.CreateTask = CreateTask;
module.exports.generateId = generateId;