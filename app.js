
//Define UI variables
const taskInputForm = document.getElementById('task-input-form');
const taskInput = document.getElementById('input-task');
const tasksFilter = document.getElementById('filter-tasks');
const clearTasks = document.getElementById('clear-tasks');
const taskCollection = document.getElementById('task-collection');

loadEventListeners();

const dataManager = new DataManager();

// class TodoList {

//     constructor(domNode) {
//         this.render()
//     }

//     render() {

//     }

// }


function loadEventListeners() {

    // Load tasks from Local Storage when the DOM is loaded
    document.addEventListener('DOMContentLoaded', loadTasks);
    
    // Add task event listener
    taskInputForm.addEventListener('submit', addTask);

    // Clear all tasks event listener
    clearTasks.addEventListener('click', clearAllTasks);

    // Filter tasks event listener
    tasksFilter.addEventListener('keyup', filterTasks);

    // Add data to Local Storage when the browser window is unloaded or closed
    window.addEventListener('unload', addToStorage);
}

function loadTasks() {
    if(dataManager.data.length) {
        taskCollection.style.display = 'block';
        dataManager.data.forEach(task => {
            // create new li element for the task item
            const li = document.createElement('li');
            const elementId = task.id;
            li.classList.add('task-item');
            li.textContent = task.caption;
            
            li.addEventListener('click', (e) => deleteTask(e, elementId));
            li.addEventListener('click', (e) => checkBoxHandler(e, elementId));


            // Create delete task item button, add class, append it to the li element
            const deleteItem = document.createElement('span');
            deleteItem.innerHTML = `&times`;
            deleteItem.classList.add('delete-item-icon');
            li.appendChild(deleteItem);

            // Create edit button, append it to the li element
            const editButton = document.createElement('a');
            editButton.innerHTML = `<span class="icon-pencil"></span>`;
            editButton.classList.add('edit-button-icon');
            li.appendChild(editButton);

            // Create checkbox, add class, append it to the li element
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.id = `checkbox-${task.id}`;
            li.appendChild(checkBox);

            const checkBoxLabel = document.createElement('label');
            checkBoxLabel.setAttribute('for',checkBox.id);
            checkBoxLabel.classList.add('checkbox-label');
            li.appendChild(checkBoxLabel);

            if(task.completed) {
                li.classList.add('completed-task');
                checkBox.setAttribute('checked', true);
            }

            // append li element to the ul with tasks
            taskCollection.appendChild(li);
        });
    }
}

function addTask(e) {
    e.preventDefault();

    if(!taskInput.value) {
        alert('You need to input some value!');
    } else {

        // Add task to the data structure and local storage
        dataManager.addTaskToData(taskInput.value, false);

        taskCollection.style.display = 'block';

        // create new li element for the task item
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.textContent = taskInput.value; 
        const elementId = dataManager.data[dataManager.data.length-1].id;
        li.addEventListener('click', (e) => deleteTask(e, elementId));
        li.addEventListener('click', (e) => checkBoxHandler(e, elementId));

        // Create delete task item button, add class, append it to the li element
        const deleteItem = document.createElement('span');
        deleteItem.innerHTML = `&times`;
        deleteItem.classList.add('delete-item-icon');
        li.appendChild(deleteItem);

        // Create edit button, append it to the li element
        const editButton = document.createElement('a');
        editButton.innerHTML = `<span class="icon-pencil"></span>`;
        editButton.classList.add('edit-button-icon');
        li.appendChild(editButton);


        // Create checkbox, add class, append it to the li element
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = `checkbox-${elementId}`;
        li.appendChild(checkBox);

        const checkBoxLabel = document.createElement('label');
        checkBoxLabel.setAttribute('for',checkBox.id);
        checkBoxLabel.classList.add('checkbox-label');
        li.appendChild(checkBoxLabel);

        // append li element to the ul with tasks
        taskCollection.appendChild(li);

        taskInput.value = '';
    }
}

function deleteTask(e, id) {
    if(e.target.classList.contains('delete-item-icon')) {
        dataManager.removeDataItem(dataManager.getIndexById(id));
        e.target.parentElement.remove();
        if(!taskCollection.children.length) {
            taskCollection.style.display = 'none';
        }
        console.log(dataManager.data);
    }
}

function clearAllTasks() {
    while(taskCollection.firstChild) {
        taskCollection.firstChild.remove();
    }
    dataManager.clearData();
    taskCollection.style.display = 'none';
}

function filterTasks(e) {
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

function addToStorage() {
    dataManager.addDataToStorage();
}

function checkBoxHandler(e, id) {
    if(e.target.classList.contains('checkbox-label')) {
        const dataItem = dataManager.getDataItem(id);
        if(e.target.parentElement.classList.contains('completed-task')) {
            dataItem.completed = false;
            e.target.parentElement.classList.remove('completed-task')
        } else {
            dataItem.completed = true;
            e.target.parentElement.classList.add('completed-task')
        }
    }
}