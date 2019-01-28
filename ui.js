class App {
    constructor(node, tasks, dataManager) {
        this.state = {
            editState: false,
            currentTask: null
        };
        this.dataManager = dataManager;
        this.node = node;
        this.tasks = null;
        this.render = this.render.bind(this);
        this.setEditState = this.setEditState.bind(this);
        this.filterTasks = this.filterTasks.bind(this);
        this.clearTasks = this.clearTasks.bind(this);
        this.addTask = this.addTask.bind(this);
        document.addEventListener('DOMContentLoaded', this.render);
    }

    render() {

        if(this.node.children.length) {
            while(this.node.firstChild) {
                this.node.firstChild.remove();
            }
        }

        this.dataManager.subscribe('renderApp',app.render);
        
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        this.node.appendChild(wrapper);

        const container = document.createElement('div');
        container.classList.add('container');
        wrapper.appendChild(container);

        const row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);

        const column = document.createElement('div');
        column.classList.add('column');
        row.appendChild(column);

        const card = document.createElement('div');
        card.classList.add('card');
        column.appendChild(card);

        const addTaskSection = document.createElement('div');
        addTaskSection.classList.add('add-tasks-section');
        card.appendChild(addTaskSection);

        const addTaskSectionTitleHolder = document.createElement('div');
        addTaskSectionTitleHolder.classList.add('title-holder');
        addTaskSection.appendChild(addTaskSectionTitleHolder);

        const addTaskSectionTitleHolderH2 = document.createElement('h2');
        addTaskSectionTitleHolderH2.textContent = 'Add Tasks'
        addTaskSectionTitleHolder.appendChild(addTaskSectionTitleHolderH2);

        const form = document.createElement('form');
        if (this.state.editState) {
            form.addEventListener('submit', e => this.updateTask(e, textInput.value));
        } else {
            form.addEventListener('submit', e => this.addTask(e, textInput))
        }
        addTaskSection.appendChild(form);

        const addTaskSectionInputHolder = document.createElement('div');
        addTaskSectionInputHolder.classList.add('input-holder');
        form.appendChild(addTaskSectionInputHolder);

        const textInput = document.createElement('input');
        textInput.setAttribute('type', 'text');
        textInput.setAttribute('placeholder', 'Input your Task');
        textInput.classList.add('input');
        if(this.state.editState) {
            textInput.setAttribute('value', this.state.currentTask.caption);
        }
        addTaskSectionInputHolder.appendChild(textInput);

        const submitInput = document.createElement('input');
        submitInput.setAttribute('type', 'submit');
        submitInput.classList.add('btn');
        if(this.state.editState) {
            submitInput.classList.add('btn-green');
            submitInput.setAttribute('value', 'Update Task');
        } else {
            submitInput.classList.add('btn-violet');
            submitInput.setAttribute('value', 'Add Task');
        }
        form.appendChild(submitInput);

        const manageTaskSection = document.createElement('div');
        manageTaskSection.classList.add('manage-tasks-section');
        card.appendChild(manageTaskSection);

        const manageTaskSectionTitleHolder = document.createElement('div');
        manageTaskSectionTitleHolder.classList.add('title-holder');
        manageTaskSection.appendChild(manageTaskSectionTitleHolder);

        const manageTaskSectionH2 = document.createElement('h2');
        manageTaskSectionH2.textContent = 'Manage Tasks';
        manageTaskSectionTitleHolder.appendChild(manageTaskSectionH2);

        const manageTaskSectionInputHolder = document.createElement('div');
        manageTaskSectionInputHolder.classList.add('input-holder');
        manageTaskSection.appendChild(manageTaskSectionInputHolder);

        const filterInput = document.createElement('input');
        filterInput.setAttribute('type', 'text');
        filterInput.setAttribute('placeholder', 'Filter Tasks');
        filterInput.classList.add('input');
        filterInput.addEventListener('keyup', this.filterTasks);
        manageTaskSectionInputHolder.appendChild(filterInput);

        const tasksNode = document.createElement('div');
        tasksNode.id = 'tasksNode';
        manageTaskSection.appendChild(tasksNode);

        const clearTasksButton = document.createElement('button');
        clearTasksButton.setAttribute('type', 'button');
        clearTasksButton.className = 'btn btn-black clear-tasks';
        clearTasksButton.textContent = 'Clear Tasks';
        clearTasksButton.addEventListener('click', this.clearTasks);
        manageTaskSection.appendChild(clearTasksButton);

        this.tasks = new Tasks(node, this.setEditState, this.dataManager);
        this.tasks.render();

    }

    setEditState(curTask) {
        this.state.editState = true;
        this.state.currentTask = curTask;
        this.render();
    }

    filterTasks(e) {
        const inputtedText = e.target.value.toLowerCase();
    
        document.querySelectorAll('.task-item').forEach(task => {
            const taskItemTextContent = task.textContent;
    
            if(taskItemTextContent.toLowerCase().indexOf(inputtedText) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    }

    addTask(e, textInput) {
        e.preventDefault();

        if(!textInput.value) {
            alert('You need to input some value!');
        } else {
            // Add task to the data structure and local storage
            this.dataManager.addTaskToData(textInput.value, false);
            textInput.value = '';
        }
    }

    clearTasks() {
        this.state.editState = false;
        this.state.currentTask = null;
        this.dataManager.clearData();
    }

    updateTask(e, caption) {
        e.preventDefault();
        this.state.currentTask.caption = caption;
        this.state.editState = false;
        this.state.currentTask = null;
        this.render();
    }
}

class Tasks {
    constructor(node, setEditState, dataManager) {
        this.dataManager = dataManager;
        this.node = node;
        this.setEditState = setEditState;
        this.render = this.render.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.checkBoxHandler = this.checkBoxHandler.bind(this);
    }

    render() {

        if(this.node.children.length) {
            while(node.firstChild) {
                node.firstChild.remove();
            }
        }

        this.dataManager.subscribe('renderTasks', this.render);

        if(!dataManager.getData().length) return;
    
        const taskCollection = document.createElement('ul');
        taskCollection.classList.add('task-collection');
        node.appendChild(taskCollection);


        this.dataManager.getData().forEach(task => {
            
            const li = document.createElement('li');
            const elementId = task.id;
            li.classList.add('task-item');
            li.textContent = task.caption;

            const deleteItem = document.createElement('span');
            deleteItem.innerHTML = `&times`;
            deleteItem.classList.add('delete-item-icon');
            deleteItem.addEventListener('click', ()=> this.deleteTask(elementId));
            li.appendChild(deleteItem);

            const editButton = document.createElement('a');
            editButton.innerHTML = `<span class="icon-pencil"></span>`;
            editButton.classList.add('edit-button-icon');
            editButton.addEventListener('click', function() {
                setEditState(this.dataManager.getDataItem(elementId));
            }.bind(this));
            li.appendChild(editButton);

            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.id = `checkbox-${elementId}`;
            checkBox.addEventListener('click', ()=> this.checkBoxHandler(elementId));
            li.appendChild(checkBox);

            const checkBoxLabel = document.createElement('label');
            checkBoxLabel.setAttribute('for',checkBox.id);
            checkBoxLabel.classList.add('checkbox-label');
            li.appendChild(checkBoxLabel);

            if(task.completed) {
                li.classList.add('completed-task');
                checkBox.setAttribute('checked', true);
            }
       
            taskCollection.appendChild(li);


            this.dataManager.subscribe('removedTask', (removedTaskId) => {
                if (removedTaskId === task.id) {
                    li.remove()
                }
            })
        });
    }

    deleteTask(id) {
        this.dataManager.removeDataItem(this.dataManager.getIndexById(id));
        
    }

    checkBoxHandler(id) {

        this.dataManager.checkBoxToggler(id);
        
    }
}