class Tasks {
  constructor(node, setEditState, dataManager, showNotification, token) {
    this.node = node
    this.setEditState = setEditState
    this.dataManager = dataManager
    this.showNotification = showNotification
    this.token = token
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
    const elementId = task._id
    li.classList.add('task-item')
    li.textContent = task.caption

    const deleteItem = document.createElement('span')
    deleteItem.innerHTML = '&times'
    deleteItem.classList.add('delete-item-icon')
    deleteItem.addEventListener('click', () => this.dataManager.removeDataItem(elementId, this.token))
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
    checkBox.addEventListener('click', () => this.dataManager.checkBoxToggler(task, this.token))
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
      if (updatedItem._id === elementId) {
        const oldText = li.childNodes[0].data
        const newText = updatedItem.caption
        li.childNodes[0].data = newText
        this.showNotification('success', `Task changed from ${oldText} to ${newText}`)
      }
    })

    const removeCheckBoxToggledSubscription = this.dataManager.pubsub.subscribe('checkBoxToggled', (checkedItem) => {
      if (checkedItem._id === elementId) {
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
      if (removedItem._id === elementId) {
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

export default Tasks
