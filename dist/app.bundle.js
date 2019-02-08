/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/client/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/client/app.js":
/*!******************************!*\
  !*** ./src/js/client/app.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http */ \"./src/js/client/http.js\");\n/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pubsub */ \"./src/js/client/pubsub.js\");\n/* harmony import */ var _dataManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataManager */ \"./src/js/client/dataManager.js\");\n/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./form */ \"./src/js/client/form.js\");\n/* harmony import */ var _components_appcomp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/appcomp */ \"./src/js/client/components/appcomp.js\");\n\n\n\n\n\nconst dataManager = new _dataManager__WEBPACK_IMPORTED_MODULE_2__[\"default\"](_http__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _pubsub__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\nconst init = () => {\n  const rootNode = document.getElementById('root');\n\n  if (!localStorage.getItem('user')) {\n    const form = new _form__WEBPACK_IMPORTED_MODULE_3__[\"default\"](rootNode, dataManager);\n    form.render();\n    _pubsub__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe('loggedInUser', user => {\n      localStorage.setItem('user', JSON.stringify(user));\n      const app = new _components_appcomp__WEBPACK_IMPORTED_MODULE_4__[\"default\"](rootNode, dataManager, user);\n      dataManager.http.get(`http://localhost:3000/tasks/${user.userId}`, `Bearer ${user.token}`).then(tasks => {\n        dataManager.initalData = [];\n        dataManager.initalData.push(...tasks);\n        app.render();\n      });\n    });\n  } else {\n    const user = JSON.parse(localStorage.getItem('user'));\n    const app = new _components_appcomp__WEBPACK_IMPORTED_MODULE_4__[\"default\"](rootNode, dataManager, user);\n    dataManager.http.get(`http://localhost:3000/tasks/${user.userId}`, `Bearer ${user.token}`).then(tasks => {\n      dataManager.initalData = [];\n      dataManager.initalData.push(...tasks);\n      app.render();\n    });\n  }\n};\n\n_pubsub__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe('loggedOut', init);\ndocument.addEventListener('DOMContentLoaded', init);\n\n//# sourceURL=webpack:///./src/js/client/app.js?");

/***/ }),

/***/ "./src/js/client/components/appcomp.js":
/*!*********************************************!*\
  !*** ./src/js/client/components/appcomp.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _taskscomp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskscomp */ \"./src/js/client/components/taskscomp.js\");\n\n\nclass App {\n  constructor(node, dataManager, user) {\n    this.dataManager = dataManager;\n    this.node = node;\n    this.editState = false;\n    this.currentTask = null;\n    this.user = user;\n    this.token = `Bearer ${this.user.token}`;\n  }\n\n  render() {\n    if (this.node.children.length) {\n      while (this.node.firstChild) {\n        this.node.firstChild.remove();\n      }\n    }\n\n    const wrapper = document.createElement('div');\n    wrapper.classList.add('wrapper');\n    this.node.appendChild(wrapper);\n    const notificationHolder = document.createElement('div');\n    notificationHolder.classList.add('notification-holder');\n    wrapper.appendChild(notificationHolder);\n    const container = document.createElement('div');\n    container.classList.add('container');\n    wrapper.appendChild(container);\n    const row = document.createElement('div');\n    row.classList.add('row');\n    container.appendChild(row);\n    const column = document.createElement('div');\n    column.classList.add('column');\n    row.appendChild(column);\n    const card = document.createElement('div');\n    card.classList.add('card');\n    column.appendChild(card);\n    const greeting = document.createElement('div');\n    greeting.textContent = `Hello, ${this.user.username}`;\n    greeting.classList.add('greeting');\n    card.appendChild(greeting);\n    const logoutBtn = document.createElement('button');\n    logoutBtn.setAttribute('type', 'button');\n    logoutBtn.className = 'btn-sm btn-violet logout-btn';\n    logoutBtn.textContent = 'Log out';\n    card.appendChild(logoutBtn);\n    logoutBtn.addEventListener('click', () => {\n      localStorage.removeItem('user');\n      this.dataManager.pubsub.publish('loggedOut');\n    });\n    const addTaskSection = document.createElement('div');\n    addTaskSection.classList.add('add-tasks-section');\n    card.appendChild(addTaskSection);\n    const addTaskSectionTitleHolder = document.createElement('div');\n    addTaskSectionTitleHolder.classList.add('title-holder');\n    addTaskSection.appendChild(addTaskSectionTitleHolder);\n    const addTaskSectionTitleHolderH2 = document.createElement('h2');\n    addTaskSectionTitleHolderH2.textContent = 'Add Tasks';\n    addTaskSectionTitleHolder.appendChild(addTaskSectionTitleHolderH2);\n\n    function showNotification(status, msg) {\n      const notification = document.createElement('div');\n      notification.textContent = msg;\n      notification.classList.add('notification');\n      notification.classList.add(status === 'success' ? 'notification-success' : 'notification-failure');\n\n      if (notificationHolder.children.length) {\n        notificationHolder.insertBefore(notification, notificationHolder.firstElementChild);\n      } else {\n        notificationHolder.appendChild(notification);\n      }\n\n      setTimeout(() => notification.remove(), 5000);\n    }\n\n    const textInput = document.createElement('input');\n\n    const addTaskHandler = function addTaskHandler(e) {\n      e.preventDefault();\n\n      if (!textInput.value) {\n        showNotification('failure', 'You need to input some value!');\n      } else {\n        this.dataManager.addTaskToData(textInput.value, this.user.userId, this.token);\n        textInput.value = '';\n      }\n    }.bind(this);\n\n    const updateTaskHandler = function updateTaskHandler(e) {\n      e.preventDefault();\n\n      if (!textInput.value) {\n        showNotification('failure', 'You need to input some value!');\n      } else {\n        const itemToUpdate = this.currentTask;\n        this.dataManager.updateTask(textInput.value, itemToUpdate, this.token);\n        removeEditState();\n      }\n    }.bind(this);\n\n    const form = document.createElement('form');\n    form.addEventListener('submit', addTaskHandler);\n    addTaskSection.appendChild(form);\n    const addTaskSectionInputHolder = document.createElement('div');\n    addTaskSectionInputHolder.classList.add('input-holder');\n    form.appendChild(addTaskSectionInputHolder);\n    textInput.setAttribute('type', 'text');\n    textInput.setAttribute('placeholder', 'Input your Task');\n    textInput.classList.add('input');\n    addTaskSectionInputHolder.appendChild(textInput);\n    const submitInput = document.createElement('input');\n    submitInput.setAttribute('type', 'submit');\n    submitInput.classList.add('btn');\n    submitInput.classList.add('btn-violet');\n    submitInput.setAttribute('value', 'Add Task');\n    form.appendChild(submitInput);\n    const manageTaskSection = document.createElement('div');\n    manageTaskSection.classList.add('manage-tasks-section');\n    card.appendChild(manageTaskSection);\n    const manageTaskSectionTitleHolder = document.createElement('div');\n    manageTaskSectionTitleHolder.classList.add('title-holder');\n    manageTaskSection.appendChild(manageTaskSectionTitleHolder);\n    const manageTaskSectionH2 = document.createElement('h2');\n    manageTaskSectionH2.textContent = 'Manage Tasks';\n    manageTaskSectionTitleHolder.appendChild(manageTaskSectionH2);\n    const manageTaskSectionInputHolder = document.createElement('div');\n    manageTaskSectionInputHolder.classList.add('input-holder');\n    manageTaskSection.appendChild(manageTaskSectionInputHolder);\n    const filterInput = document.createElement('input');\n    filterInput.setAttribute('type', 'text');\n    filterInput.setAttribute('placeholder', 'Filter Tasks');\n    filterInput.classList.add('input');\n    filterInput.addEventListener('keyup', App.filterTasks);\n    manageTaskSectionInputHolder.appendChild(filterInput);\n    const tasksNode = document.createElement('div');\n    tasksNode.id = 'tasksNode';\n    manageTaskSection.appendChild(tasksNode);\n    const clearTasksButton = document.createElement('button');\n    clearTasksButton.setAttribute('type', 'button');\n    clearTasksButton.className = 'btn btn-black clear-tasks';\n    clearTasksButton.textContent = 'Clear Tasks';\n    clearTasksButton.addEventListener('click', () => {\n      this.dataManager.clearData(this.token);\n    });\n    manageTaskSection.appendChild(clearTasksButton);\n    const cancelEditStateBtn = document.createElement('input');\n    cancelEditStateBtn.setAttribute('type', 'submit');\n    cancelEditStateBtn.classList.add('btn');\n    cancelEditStateBtn.classList.add('btn-red');\n    cancelEditStateBtn.setAttribute('value', 'Cancel');\n\n    const setEditState = function setEditState(curTask) {\n      this.editState = true;\n      form.removeEventListener('submit', addTaskHandler);\n      form.addEventListener('submit', updateTaskHandler);\n      form.appendChild(cancelEditStateBtn);\n      this.currentTask = curTask;\n      textInput.value = this.currentTask.caption;\n      submitInput.classList.remove('btn-violet');\n      submitInput.classList.add('btn-green');\n      submitInput.setAttribute('value', 'Update Task');\n    }.bind(this);\n\n    const removeEditState = function removeEditState() {\n      this.editState = false;\n      this.currentTask = null;\n      form.removeEventListener('submit', updateTaskHandler);\n      form.addEventListener('submit', addTaskHandler);\n      form.removeChild(cancelEditStateBtn);\n      textInput.value = '';\n      submitInput.classList.remove('btn-green');\n      submitInput.classList.add('btn-violet');\n      submitInput.setAttribute('value', 'Add Task');\n    }.bind(this);\n\n    cancelEditStateBtn.addEventListener('click', removeEditState);\n\n    const clearTasksHelper = function clearTasksHelper() {\n      if (this.editState) {\n        removeEditState();\n      }\n    }.bind(this);\n\n    this.dataManager.pubsub.subscribe('tasksCleared', clearTasksHelper);\n    this.dataManager.pubsub.subscribe('Error', e => {\n      const status = 'failure';\n      const msg = `An error occurred: ${e}.`;\n      showNotification(status, msg);\n    });\n    this.tasks = new _taskscomp__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tasksNode, setEditState, this.dataManager, showNotification, this.token);\n    this.tasks.render();\n  }\n\n  static filterTasks(e) {\n    const inputtedText = e.target.value.toLowerCase();\n    document.querySelectorAll('.task-item').forEach(taskItem => {\n      const taskItemTextContent = taskItem.textContent;\n\n      if (parseInt(taskItemTextContent.toLowerCase().indexOf(inputtedText), 10) !== -1) {\n        taskItem.style.display = 'block';\n      } else {\n        taskItem.style.display = 'none';\n      }\n    });\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/js/client/components/appcomp.js?");

/***/ }),

/***/ "./src/js/client/components/taskscomp.js":
/*!***********************************************!*\
  !*** ./src/js/client/components/taskscomp.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Tasks {\n  constructor(node, setEditState, dataManager, showNotification, token) {\n    this.node = node;\n    this.setEditState = setEditState;\n    this.dataManager = dataManager;\n    this.showNotification = showNotification;\n    this.token = token;\n  }\n\n  render() {\n    if (this.node.children.length) {\n      while (this.node.firstChild) {\n        this.node.firstChild.remove();\n      }\n    }\n\n    this.taskCollection = document.createElement('ul');\n    this.node.appendChild(this.taskCollection);\n    this.dataManager.pubsub.subscribe('taskAdded', addedItem => {\n      if (!this.taskCollection.classList.contains('task-collection')) {\n        this.taskCollection.classList.add('task-collection');\n      }\n\n      this.createTaskItem(addedItem);\n      const status = 'success';\n      const msg = `Task \"${addedItem.caption}\" added successfully`;\n      this.showNotification(status, msg);\n    });\n    this.dataManager.pubsub.subscribe('tasksCleared', () => {\n      if (this.taskCollection.children.length) {\n        this.taskCollection.classList.remove('task-collection');\n\n        while (this.taskCollection.firstChild) {\n          this.taskCollection.firstChild.remove();\n        }\n\n        this.showNotification('success', 'All tasks have been deleted');\n      }\n    });\n    if (!this.dataManager.getData().length) return;\n    this.taskCollection.classList.add('task-collection');\n    this.dataManager.getData().forEach(task => this.createTaskItem(task));\n  }\n\n  createTaskItem(task) {\n    const li = document.createElement('li');\n    const elementId = task._id;\n    li.classList.add('task-item');\n    li.textContent = task.caption;\n    const deleteItem = document.createElement('span');\n    deleteItem.innerHTML = '&times';\n    deleteItem.classList.add('delete-item-icon');\n    deleteItem.addEventListener('click', () => this.dataManager.removeDataItem(elementId, this.token));\n    li.appendChild(deleteItem);\n    const editButton = document.createElement('a');\n    editButton.innerHTML = '<span class=\"icon-pencil\"></span>';\n    editButton.classList.add('edit-button-icon');\n    editButton.addEventListener('click', () => {\n      this.setEditState(task);\n    });\n    li.appendChild(editButton);\n    const checkBox = document.createElement('input');\n    checkBox.type = 'checkbox';\n    checkBox.id = `checkbox-${elementId}`;\n    checkBox.addEventListener('click', () => this.dataManager.checkBoxToggler(task, this.token));\n    li.appendChild(checkBox);\n    const checkBoxLabel = document.createElement('label');\n    checkBoxLabel.setAttribute('for', checkBox.id);\n    checkBoxLabel.classList.add('checkbox-label');\n    li.appendChild(checkBoxLabel);\n\n    if (task.completed) {\n      li.classList.add('completed-task');\n      checkBox.setAttribute('checked', true);\n    }\n\n    const removeTaskUpdatedSubscription = this.dataManager.pubsub.subscribe('taskUpdated', updatedItem => {\n      if (updatedItem._id === elementId) {\n        const oldText = li.childNodes[0].data;\n        const newText = updatedItem.caption;\n        li.childNodes[0].data = newText;\n        this.showNotification('success', `Task changed from ${oldText} to ${newText}`);\n      }\n    });\n    const removeCheckBoxToggledSubscription = this.dataManager.pubsub.subscribe('checkBoxToggled', checkedItem => {\n      if (checkedItem._id === elementId) {\n        if (checkedItem.completed) {\n          li.classList.add('completed-task');\n          checkBox.setAttribute('checked', true);\n        } else {\n          li.classList.remove('completed-task');\n          checkBox.removeAttribute('checked');\n        }\n      }\n    });\n    const removeRemovedTaskSubscription = this.dataManager.pubsub.subscribe('removedTask', removedItem => {\n      if (removedItem._id === elementId) {\n        li.remove();\n        removeTaskUpdatedSubscription();\n        removeCheckBoxToggledSubscription();\n        removeRemovedTaskSubscription();\n        this.showNotification('success', `Task \"${removedItem.caption}\" removed`);\n\n        if (!this.taskCollection.children.length) {\n          this.taskCollection.classList.remove('task-collection');\n        }\n      }\n    });\n    this.taskCollection.appendChild(li);\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Tasks);\n\n//# sourceURL=webpack:///./src/js/client/components/taskscomp.js?");

/***/ }),

/***/ "./src/js/client/dataManager.js":
/*!**************************************!*\
  !*** ./src/js/client/dataManager.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// type User = {\n//   name: string,\n//   age: number,\n// }\n// const arr = [\n//   {\n//     name: 'name1',\n//     age: 12,\n//   },\n//   {\n//     name: 'name2',\n//     age: 13,\n//   },\n// ]\n// function incapsulateEntity<T>(entity: Array<T>): {\n//   entity: Array<T>,\n// } {\n//   return {\n//     entity,\n//   }\n// }\nconst s = 'string';\nconsole.log(s);\n\nclass DataManager {\n  constructor(http, pubsub) {\n    this.initalData = [];\n    this.http = http;\n    this.pubsub = pubsub;\n  }\n\n  getData() {\n    return this.initalData;\n  }\n\n  login(username, password) {\n    this.http.post('http://localhost:3000/login/', {\n      username,\n      password\n    }).then(user => {\n      if (user.success) {\n        this.pubsub.publish('loggedInUser', user.data);\n      } else {\n        this.pubsub.publish('loginFailed');\n      }\n    }).catch(e => this.pubsub.publish('loginFailed', e));\n  }\n\n  register(username, password) {\n    this.http.post('http://localhost:3000/register/', {\n      username,\n      password\n    }).then(user => {\n      if (user.success) {\n        this.pubsub.publish('loggedInUser', user.data);\n      } else {\n        this.pubsub.publish('usernameExists');\n      }\n    }); // .catch(e => this.pubsub.publish('loginFailed', e))\n  }\n\n  addTaskToData(caption, userId, token) {\n    this.http.post('http://localhost:3000/tasks/', {\n      caption,\n      userId\n    }, token).then(addedTask => this.pubsub.publish('taskAdded', addedTask)).catch(e => this.pubsub.publish('Error', e));\n  }\n\n  removeDataItem(id, token) {\n    this.http.delete(`http://localhost:3000/tasks/${id}`, token).then(removedItem => this.pubsub.publish('removedTask', removedItem)).catch(e => this.pubsub.publish('Error', e));\n  }\n\n  updateTask(input, taskObj, token) {\n    taskObj.caption = input;\n    this.http.put('http://localhost:3000/tasks/', taskObj, token).then(updatedItem => this.pubsub.publish('taskUpdated', updatedItem)).catch(e => this.pubsub.publish('Error', e));\n  }\n\n  checkBoxToggler(taskObj, token) {\n    if (taskObj.completed) {\n      taskObj.completed = false;\n    } else {\n      taskObj.completed = true;\n    }\n\n    this.http.put('http://localhost:3000/tasks/', taskObj, token).then(checkedItem => this.pubsub.publish('checkBoxToggled', checkedItem)).catch(e => this.pubsub.publish('Error', e));\n  }\n\n  clearData(token) {\n    this.http.delete('http://localhost:3000/remove-all-tasks', token).then(this.pubsub.publish('tasksCleared')).catch(e => this.pubsub.publish('Error', e));\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DataManager);\n\n//# sourceURL=webpack:///./src/js/client/dataManager.js?");

/***/ }),

/***/ "./src/js/client/form.js":
/*!*******************************!*\
  !*** ./src/js/client/form.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Form {\n  constructor(node, dataManager) {\n    this.node = node;\n    this.dataManager = dataManager;\n    this.state = {\n      login: true,\n      signup: false\n    };\n  }\n\n  render() {\n    if (this.node.children.length) {\n      while (this.node.firstChild) {\n        this.node.firstChild.remove();\n      }\n    }\n\n    const wrapper = document.createElement('div');\n    wrapper.classList.add('wrapper');\n    this.node.appendChild(wrapper);\n    const notificationHolder = document.createElement('div');\n    notificationHolder.classList.add('notification-holder');\n    wrapper.appendChild(notificationHolder);\n\n    function showNotification(status, msg) {\n      const notification = document.createElement('div');\n      notification.textContent = msg;\n      notification.classList.add('notification');\n      notification.classList.add(status === 'success' ? 'notification-success' : 'notification-failure');\n\n      if (notificationHolder.children.length) {\n        notificationHolder.insertBefore(notification, notificationHolder.firstElementChild);\n      } else {\n        notificationHolder.appendChild(notification);\n      }\n\n      setTimeout(() => notification.remove(), 5000);\n    }\n\n    const container = document.createElement('div');\n    container.classList.add('container');\n    wrapper.appendChild(container);\n    const row = document.createElement('div');\n    row.classList.add('row');\n    container.appendChild(row);\n    const column = document.createElement('div');\n    column.classList.add('column');\n    row.appendChild(column);\n    const card = document.createElement('div');\n    card.classList.add('card');\n    column.appendChild(card);\n    const form = document.createElement('form');\n    form.classList.add('login-form');\n    card.appendChild(form);\n    const formTitleHolder = document.createElement('div');\n    formTitleHolder.classList.add('title-holder');\n    form.appendChild(formTitleHolder);\n    const formTitle = document.createElement('h2');\n    formTitle.textContent = 'Log in to your account';\n    formTitleHolder.appendChild(formTitle);\n    const unInputHolder = document.createElement('div');\n    unInputHolder.classList.add('input-holder');\n    form.appendChild(unInputHolder);\n    const unInput = document.createElement('input');\n    unInput.classList.add('input');\n    unInput.setAttribute('type', 'text');\n    unInput.setAttribute('placeholder', 'Username');\n    unInputHolder.appendChild(unInput);\n    const pwdInputHolder = document.createElement('div');\n    pwdInputHolder.classList.add('input-holder');\n    form.appendChild(pwdInputHolder);\n    const pwdInput = document.createElement('input');\n    pwdInput.classList.add('input');\n    pwdInput.setAttribute('type', 'password');\n    pwdInput.setAttribute('placeholder', 'Password');\n    pwdInputHolder.appendChild(pwdInput);\n    const confirmPwdInputHolder = document.createElement('div');\n    confirmPwdInputHolder.className = 'input-holder invisible';\n    form.appendChild(confirmPwdInputHolder);\n    const confirmPwdInput = document.createElement('input');\n    confirmPwdInput.classList.add('input');\n    confirmPwdInput.setAttribute('type', 'password');\n    confirmPwdInput.setAttribute('placeholder', 'Confirm Password');\n    confirmPwdInputHolder.appendChild(confirmPwdInput);\n    const innerRow = document.createElement('div');\n    innerRow.classList.add('row');\n    form.appendChild(innerRow);\n    const signUpLinkHolder = document.createElement('div');\n    signUpLinkHolder.className = 'column col-half title-holder';\n    innerRow.appendChild(signUpLinkHolder);\n    const signUpLink = document.createElement('a');\n    signUpLink.classList.add('login-link');\n    signUpLink.textContent = 'Sign Up';\n    signUpLinkHolder.appendChild(signUpLink);\n    const forgotPasswordLinkHolder = document.createElement('div');\n    forgotPasswordLinkHolder.className = 'column col-half title-holder';\n    innerRow.appendChild(forgotPasswordLinkHolder);\n    const forgotPasswordLink = document.createElement('a');\n    forgotPasswordLink.classList.add('login-link');\n    forgotPasswordLink.textContent = 'Forgot Password?';\n    forgotPasswordLinkHolder.appendChild(forgotPasswordLink);\n    const logInButton = document.createElement('input');\n    logInButton.setAttribute('type', 'submit');\n    logInButton.value = 'Login';\n    logInButton.className = 'btn btn-violet btn-block';\n    form.appendChild(logInButton);\n\n    const login = e => {\n      e.preventDefault();\n\n      if (!unInput.value || !pwdInput.value) {\n        showNotification('failure', 'Input username and password');\n        unInput.value = '';\n        pwdInput.value = '';\n      } else {\n        this.dataManager.login(unInput.value, pwdInput.value);\n      }\n    };\n\n    this.dataManager.pubsub.subscribe('loginFailed', () => {\n      showNotification('failure', 'Username or password is incorrect');\n      unInput.value = '';\n      pwdInput.value = '';\n    });\n    this.dataManager.pubsub.subscribe('usernameExists', () => {\n      showNotification('failure', 'This username is occuppied');\n      unInput.value = '';\n      pwdInput.value = '';\n      confirmPwdInput.value = '';\n    });\n\n    const register = e => {\n      e.preventDefault();\n\n      if (pwdInput.value === confirmPwdInput.value) {\n        this.dataManager.register(unInput.value, pwdInput.value);\n      } else {\n        showNotification('failure', \"Password doesn't match\");\n      }\n    };\n\n    form.addEventListener('submit', login);\n    const signUpButton = document.createElement('input');\n    signUpButton.setAttribute('type', 'submit');\n    signUpButton.value = 'Sign up';\n    signUpButton.className = 'btn btn-violet btn-block invisible';\n    form.appendChild(signUpButton);\n\n    function setSignUpState() {\n      formTitle.textContent = 'Create an account';\n      unInput.value = '';\n      pwdInput.value = '';\n      logInButton.classList.add('invisible');\n      signUpLink.classList.add('invisible');\n      forgotPasswordLink.classList.add('invisible');\n      signUpButton.classList.remove('invisible');\n      confirmPwdInputHolder.classList.remove('invisible');\n      form.removeEventListener('submit', login);\n      form.addEventListener('submit', register);\n    }\n\n    signUpLink.addEventListener('click', setSignUpState);\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Form);\n\n//# sourceURL=webpack:///./src/js/client/form.js?");

/***/ }),

/***/ "./src/js/client/http.js":
/*!*******************************!*\
  !*** ./src/js/client/http.js ***!
  \*******************************/
/*! exports provided: makeHttpClient, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeHttpClient\", function() { return makeHttpClient; });\nconst makeHttpClient = fetch => ({\n  async get(url, token) {\n    const response = await fetch(url, {\n      headers: {\n        Authorization: token\n      }\n    });\n    const resData = await response.json();\n    return resData;\n  },\n\n  async post(url, data, token) {\n    const response = await fetch(url, {\n      method: 'POST',\n      headers: {\n        'Content-type': 'application/json',\n        Authorization: token\n      },\n      body: JSON.stringify(data)\n    });\n    const resData = await response.json();\n    return resData;\n  },\n\n  async put(url, data, token) {\n    const response = await fetch(url, {\n      method: 'PUT',\n      headers: {\n        'Content-type': 'application/json',\n        Authorization: token\n      },\n      body: JSON.stringify(data)\n    });\n    const resData = await response.json();\n    return resData;\n  },\n\n  async delete(url, token) {\n    const response = await fetch(url, {\n      method: 'DELETE',\n      headers: {\n        'Content-type': 'application/json',\n        Authorization: token\n      }\n    });\n    const resData = await response.json();\n    return resData;\n  }\n\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (makeHttpClient(fetch));\n\n//# sourceURL=webpack:///./src/js/client/http.js?");

/***/ }),

/***/ "./src/js/client/pubsub.js":
/*!*********************************!*\
  !*** ./src/js/client/pubsub.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Pubsub {\n  constructor() {\n    this.events = {};\n  }\n\n  subscribe(action, listener) {\n    if (!Object.prototype.hasOwnProperty.call(this.events, action)) {\n      this.events[action] = [];\n    }\n\n    const indexOfAddedListener = this.events[action].push(listener) - 1;\n    return function removeListener() {\n      delete this.events[action][indexOfAddedListener];\n    }.bind(this);\n  }\n\n  publish(action, payload) {\n    if (!Object.prototype.hasOwnProperty.call(this.events, action)) return;\n    this.events[action].forEach(listener => {\n      listener(payload);\n    });\n  }\n\n}\n\nconst pubsub = new Pubsub();\n/* harmony default export */ __webpack_exports__[\"default\"] = (pubsub);\n\n//# sourceURL=webpack:///./src/js/client/pubsub.js?");

/***/ })

/******/ });