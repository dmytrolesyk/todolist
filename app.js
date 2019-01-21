
//Define UI variables
const taskInputForm = document.getElementById('task-input-form');
const taskInput = document.getElementById('input-task');
const tasksFilter = document.getElementById('filter-tasks');
const clearTasks = document.getElementById('clear-tasks');
const taskCollection = document.getElementById('task-collection');

loadEventListeners();

const dataManager = new DataManager();
dataManager.init();

function loadEventListeners() {
    
    // Add task event listener
    taskInputForm.addEventListener('submit', addTask);

    // Delete task event listener
    taskCollection.addEventListener('click', deleteTask);

    // Clear all tasks event listener
    clearTasks.addEventListener('click', clearAllTasks);

    // Filter tasks event listener
    tasksFilter.addEventListener('keyup', filterTasks);
}

function addTask(e) {
    e.preventDefault();

    if(!taskInput.value) {
        alert('You need to input some value!');
    } else {

        taskCollection.style.display = 'block';
        // create new li element for the task item
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.textContent = taskInput.value; 

        // Create delete task item button, add class, append it to the li element
        const deleteItem = document.createElement('span');
        deleteItem.innerHTML = `&times`;
        deleteItem.classList.add('delete-item-icon');
        li.appendChild(deleteItem);

        // append li element to the ul with tasks
        taskCollection.appendChild(li);

        // Add task to the data structure and local storage
        dataManager.addTaskToStorage(taskInput.value, false);

        taskInput.value = '';
    }
}

function deleteTask(e) {
    if(e.target.parentElement.classList.contains('task-item')) {
        e.target.parentElement.remove();
        if(!taskCollection.children.length) {
            taskCollection.style.display = 'none';
        }
    }
}

function clearAllTasks() {
    while(taskCollection.firstChild) {
        taskCollection.firstChild.remove();
    }
    taskCollection.style.display = 'none';
}

function filterTasks(e) {
    const inputtedText = e.target.value.toLowerCase();

	document.querySelectorAll('.task-item').forEach(function(task){
		const taskItemTextContent = task.textContent;

		if(taskItemTextContent.toLowerCase().indexOf(inputtedText) != -1) {
            task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}
