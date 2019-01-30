class App {
  constructor(node) {
    this.dataManager = new DataManager(http)
    this.node = node
    this.editState = false
    this.currentTask = null
  }

  render() {
    if (this.node.children.length) {
      while (this.node.firstChild) {
        this.node.firstChild.remove()
      }
    }
    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    this.node.appendChild(wrapper)

    const notificationHolder = document.createElement('div')
    notificationHolder.classList.add('notification-holder')
    wrapper.appendChild(notificationHolder)

    const container = document.createElement('div')
    container.classList.add('container')
    wrapper.appendChild(container)

    const row = document.createElement('div')
    row.classList.add('row')
    container.appendChild(row)

    const column = document.createElement('div')
    column.classList.add('column')
    row.appendChild(column)

    const card = document.createElement('div')
    card.classList.add('card')
    column.appendChild(card)

    const addTaskSection = document.createElement('div')
    addTaskSection.classList.add('add-tasks-section')
    card.appendChild(addTaskSection)

    const addTaskSectionTitleHolder = document.createElement('div')
    addTaskSectionTitleHolder.classList.add('title-holder')
    addTaskSection.appendChild(addTaskSectionTitleHolder)

    const addTaskSectionTitleHolderH2 = document.createElement('h2')
    addTaskSectionTitleHolderH2.textContent = 'Add Tasks'
    addTaskSectionTitleHolder.appendChild(addTaskSectionTitleHolderH2)

    function showNotification(status, msg) {
      const notification = document.createElement('div')
      notification.textContent = msg
      notification.classList.add('notification')
      notification.classList.add(status === 'success' ? 'notification-success' : 'notification-failure')
      if (notificationHolder.children.length) {
        notificationHolder.insertBefore(notification, notificationHolder.firstElementChild)
      } else {
        notificationHolder.appendChild(notification)
      }
      setTimeout(() => notification.remove(), 5000)
    }

    const textInput = document.createElement('input')
    const addTaskHandler = function updateTaskHandler(e) {
      e.preventDefault()
      if (!textInput.value) {
        showNotification('failure', 'You need to input some value!')
      } else {
        this.dataManager.addTaskToData(textInput.value)
        textInput.value = ''
      }
    }.bind(this)

    const updateTaskHandler = function updateTaskHandler(e) {
      e.preventDefault()
      if (!textInput.value) {
        showNotification('failure', 'You need to input some value!')
      } else {
        const itemToUpdate = this.currentTask
        this.dataManager.updateTask(textInput.value, itemToUpdate)
        removeEditState()
      }
    }.bind(this)

    const form = document.createElement('form')
    form.addEventListener('submit', addTaskHandler)
    addTaskSection.appendChild(form)

    const addTaskSectionInputHolder = document.createElement('div')
    addTaskSectionInputHolder.classList.add('input-holder')
    form.appendChild(addTaskSectionInputHolder)

    textInput.setAttribute('type', 'text')
    textInput.setAttribute('placeholder', 'Input your Task')
    textInput.classList.add('input')
    addTaskSectionInputHolder.appendChild(textInput)

    const submitInput = document.createElement('input')
    submitInput.setAttribute('type', 'submit')
    submitInput.classList.add('btn')
    submitInput.classList.add('btn-violet')
    submitInput.setAttribute('value', 'Add Task')
    form.appendChild(submitInput)

    const manageTaskSection = document.createElement('div')
    manageTaskSection.classList.add('manage-tasks-section')
    card.appendChild(manageTaskSection)
    const manageTaskSectionTitleHolder = document.createElement('div')
    manageTaskSectionTitleHolder.classList.add('title-holder')
    manageTaskSection.appendChild(manageTaskSectionTitleHolder)
    const manageTaskSectionH2 = document.createElement('h2')
    manageTaskSectionH2.textContent = 'Manage Tasks'
    manageTaskSectionTitleHolder.appendChild(manageTaskSectionH2)
    const manageTaskSectionInputHolder = document.createElement('div')
    manageTaskSectionInputHolder.classList.add('input-holder')
    manageTaskSection.appendChild(manageTaskSectionInputHolder)

    const filterInput = document.createElement('input')
    filterInput.setAttribute('type', 'text')
    filterInput.setAttribute('placeholder', 'Filter Tasks')
    filterInput.classList.add('input')
    filterInput.addEventListener('keyup', App.filterTasks)
    manageTaskSectionInputHolder.appendChild(filterInput)

    const tasksNode = document.createElement('div')
    tasksNode.id = 'tasksNode'
    manageTaskSection.appendChild(tasksNode)

    const clearTasksButton = document.createElement('button')
    clearTasksButton.setAttribute('type', 'button')
    clearTasksButton.className = 'btn btn-black clear-tasks'
    clearTasksButton.textContent = 'Clear Tasks'
    clearTasksButton.addEventListener('click', () => {
      this.dataManager.clearData()
    })
    manageTaskSection.appendChild(clearTasksButton)

    const cancelEditStateBtn = document.createElement('input')
    cancelEditStateBtn.setAttribute('type', 'submit')
    cancelEditStateBtn.classList.add('btn')
    cancelEditStateBtn.classList.add('btn-red')
    cancelEditStateBtn.setAttribute('value', 'Cancel')

    const setEditState = function setEditState(curTask) {
      this.editState = true
      form.removeEventListener('submit', addTaskHandler)
      form.addEventListener('submit', updateTaskHandler)
      form.appendChild(cancelEditStateBtn)
      this.currentTask = curTask
      textInput.value = this.currentTask.caption
      submitInput.classList.remove('btn-violet')
      submitInput.classList.add('btn-green')
      submitInput.setAttribute('value', 'Update Task')
    }.bind(this)

    const removeEditState = function removeEditState() {
      this.editState = false
      this.currentTask = null
      form.removeEventListener('submit', updateTaskHandler)
      form.addEventListener('submit', addTaskHandler)
      form.removeChild(cancelEditStateBtn)
      textInput.value = ''
      submitInput.classList.remove('btn-green')
      submitInput.classList.add('btn-violet')
      submitInput.setAttribute('value', 'Add Task')
    }.bind(this)

    cancelEditStateBtn.addEventListener('click', removeEditState)

    const clearTasksHelper = function clearTasksHelper() {
      if (this.editState) {
        removeEditState()
      }
    }.bind(this)

    this.dataManager.pubsub.subscribe('tasksCleared', clearTasksHelper)

    this.dataManager.pubsub.subscribe('Error', (e) => {
      const status = 'failure'
      const msg = `An error occurred: ${e}.`
      showNotification(status, msg)
    })

    this.tasks = new Tasks(tasksNode, setEditState, this.dataManager, showNotification)

    this.tasks.render()
  }

  static filterTasks(e) {
    const inputtedText = e.target.value.toLowerCase()

    document.querySelectorAll('.task-item').forEach((taskItem) => {
      const taskItemTextContent = taskItem.textContent

      if (parseInt(taskItemTextContent.toLowerCase().indexOf(inputtedText), 10) !== -1) {
        taskItem.style.display = 'block'
      } else {
        taskItem.style.display = 'none'
      }
    })
  }
}

class Tasks {
  constructor(node, setEditState, dataManager, showNotification) {
    this.node = node
    this.setEditState = setEditState
    this.dataManager = dataManager
    this.showNotification = showNotification
  }

  render() {
    if (this.node.children.length) {
      while (this.node.firstChild) {
        this.node.firstChild.remove()
      }
    }

    this.taskCollection = document.createElement('ul')
    this.node.appendChild(this.taskCollection)

    this.dataManager.pubsub.subscribe('taskAdded', (addedItem) => {
      if (!this.taskCollection.classList.contains('task-collection')) {
        this.taskCollection.classList.add('task-collection')
      }
      this.createTaskItem(addedItem)
      const status = 'success'
      const msg = `Task "${addedItem.caption}" added successfully`
      this.showNotification(status, msg)
    })

    this.dataManager.pubsub.subscribe('tasksCleared', () => {
      if (this.taskCollection.children.length) {
        this.taskCollection.classList.remove('task-collection')
        while (this.taskCollection.firstChild) {
          this.taskCollection.firstChild.remove()
        }
        this.showNotification('success', 'All tasks have been deleted')
      }
    })

    if (!this.dataManager.getData().length) return

    this.taskCollection.classList.add('task-collection')

    this.dataManager.getData().forEach(task => this.createTaskItem(task))
  }

  createTaskItem(task) {
    const li = document.createElement('li')
    const elementId = task.id
    li.classList.add('task-item')
    li.textContent = task.caption

    const deleteItem = document.createElement('span')
    deleteItem.innerHTML = '&times'
    deleteItem.classList.add('delete-item-icon')
    deleteItem.addEventListener('click', () => this.dataManager.removeDataItem(elementId))
    li.appendChild(deleteItem)

    const editButton = document.createElement('a')
    editButton.innerHTML = '<span class="icon-pencil"></span>'
    editButton.classList.add('edit-button-icon')
    editButton.addEventListener('click', () => {
      this.setEditState(task)
    })
    li.appendChild(editButton)

    const checkBox = document.createElement('input')
    checkBox.type = 'checkbox'
    checkBox.id = `checkbox-${elementId}`
    checkBox.addEventListener('click', () => this.dataManager.checkBoxToggler(task))
    li.appendChild(checkBox)

    const checkBoxLabel = document.createElement('label')
    checkBoxLabel.setAttribute('for', checkBox.id)
    checkBoxLabel.classList.add('checkbox-label')
    li.appendChild(checkBoxLabel)
    if (task.completed) {
      li.classList.add('completed-task')
      checkBox.setAttribute('checked', true)
    }

    const removeTaskUpdatedSubscription = this.dataManager.pubsub.subscribe('taskUpdated', (updatedItem) => {
      if (updatedItem.id === elementId) {
        const oldText = li.childNodes[0].data
        const newText = updatedItem.caption
        li.childNodes[0].data = newText
        this.showNotification('success', `Task changed from ${oldText} to ${newText}`)
      }
    })

    const removeCheckBoxToggledSubscription = this.dataManager.pubsub.subscribe('checkBoxToggled', (checkedItem) => {
      if (checkedItem.id === elementId) {
        if (checkedItem.completed) {
          li.classList.add('completed-task')
          checkBox.setAttribute('checked', true)
        } else {
          li.classList.remove('completed-task')
          checkBox.removeAttribute('checked')
        }
      }
    })

    const removeRemovedTaskSubscription = this.dataManager.pubsub.subscribe('removedTask', (removedItem) => {
      if (removedItem.id === elementId) {
        li.remove()
        removeTaskUpdatedSubscription()
        removeCheckBoxToggledSubscription()
        removeRemovedTaskSubscription()
        this.showNotification('success', `Task "${removedItem.caption}" removed`)
        if (!this.taskCollection.children.length) {
          this.taskCollection.classList.remove('task-collection')
        }
      }
    })


    this.taskCollection.appendChild(li)
  }
}
