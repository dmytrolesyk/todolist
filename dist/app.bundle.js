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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http */ \"./src/js/client/http.js\");\n/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pubsub */ \"./src/js/client/pubsub.js\");\n/* harmony import */ var _dataManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataManager */ \"./src/js/client/dataManager.js\");\n/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./form */ \"./src/js/client/form.js\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui */ \"./src/js/client/ui.js\");\n\n\n\n\n\n\nconst dataManager = new _dataManager__WEBPACK_IMPORTED_MODULE_2__[\"default\"](_http__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _pubsub__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n\nconst init = () => {\n  const rootNode = document.getElementById('root')\n  if (!localStorage.getItem('userId')) {\n    const form = new _form__WEBPACK_IMPORTED_MODULE_3__[\"default\"](rootNode, dataManager)\n\n    form.render()\n\n    _pubsub__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe('loggedInUser', (user) => {\n      localStorage.setItem('token', user.token)\n      localStorage.setItem('userId', user.userId)\n      const app = new _ui__WEBPACK_IMPORTED_MODULE_4__[\"default\"](rootNode, dataManager, user.userId)\n      dataManager.http.get(`http://localhost:3000/tasks/${user.userId}`)\n        .then((tasks) => {\n          dataManager.initalData = []\n          dataManager.initalData.push(...tasks)\n          app.render()\n        })\n    })\n  } else {\n    const userId = localStorage.getItem('userId')\n    const app = new _ui__WEBPACK_IMPORTED_MODULE_4__[\"default\"](rootNode, dataManager, userId)\n    dataManager.http.get(`http://localhost:3000/tasks/${userId}`)\n      .then((tasks) => {\n        dataManager.initalData = []\n        dataManager.initalData.push(...tasks)\n        app.render()\n      })\n  }\n}\n\n_pubsub__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe('loggedOut', init)\n\ndocument.addEventListener('DOMContentLoaded', init)\n\n\n//# sourceURL=webpack:///./src/js/client/app.js?");

/***/ }),

/***/ "./src/js/client/dataManager.js":
/*!**************************************!*\
  !*** ./src/js/client/dataManager.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass DataManager {\n  constructor(http, pubsub) {\n    this.initalData = []\n    this.http = http\n    this.pubsub = pubsub\n  }\n\n  getData() {\n    return this.initalData\n  }\n\n  login(username, password) {\n    this.http.post('http://localhost:3000/login/', { username, password })\n      .then(user => this.pubsub.publish('loggedInUser', user))\n      .catch(e => this.pubsub.publish('loginFailed', e))\n  }\n\n  register(username, password) {\n    this.http.post('http://localhost:3000/register/', { username, password })\n      .then(user => this.pubsub.publish('loggedInUser', user))\n      .catch(e => this.pubsub.publish('loginFailed', e))\n  }\n\n  addTaskToData(caption, userId) {\n    this.http.post('http://localhost:3000/tasks/', { caption, userId })\n      .then(addedTask => this.pubsub.publish('taskAdded', addedTask))\n      .catch(e => this.pubsub.publish('Error', e))\n  }\n\n  removeDataItem(id) {\n    this.http.delete(`http://localhost:3000/tasks/${id}`)\n      .then(removedItem => this.pubsub.publish('removedTask', removedItem))\n      .catch(e => this.pubsub.publish('Error', e))\n  }\n\n  updateTask(input, taskObj) {\n    taskObj.caption = input\n    this.http.put('http://localhost:3000/tasks/', taskObj)\n      .then(updatedItem => this.pubsub.publish('taskUpdated', updatedItem))\n      .catch(e => this.pubsub.publish('Error', e))\n  }\n\n  checkBoxToggler(taskObj) {\n    if (taskObj.completed) {\n      taskObj.completed = false\n    } else {\n      taskObj.completed = true\n    }\n    this.http.put('http://localhost:3000/tasks/', taskObj)\n      .then(checkedItem => this.pubsub.publish('checkBoxToggled', checkedItem))\n      .catch(e => this.pubsub.publish('Error', e))\n  }\n\n  clearData() {\n    this.http.delete('http://localhost:3000/remove-all-tasks')\n      .then(this.pubsub.publish('tasksCleared'))\n      .catch(e => this.pubsub.publish('Error', e))\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DataManager);\n\n\n//# sourceURL=webpack:///./src/js/client/dataManager.js?");

/***/ }),

/***/ "./src/js/client/form.js":
/*!*******************************!*\
  !*** ./src/js/client/form.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Form {\n  constructor(node, dataManager) {\n    this.node = node\n    this.dataManager = dataManager\n    this.state = {\n      login: true,\n      signup: false,\n    }\n  }\n\n  render() {\n    if (this.node.children.length) {\n      while (this.node.firstChild) {\n        this.node.firstChild.remove()\n      }\n    }\n    const wrapper = document.createElement('div')\n    wrapper.classList.add('wrapper')\n    this.node.appendChild(wrapper)\n\n    const container = document.createElement('div')\n    container.classList.add('container')\n    wrapper.appendChild(container)\n\n    const row = document.createElement('div')\n    row.classList.add('row')\n    container.appendChild(row)\n\n    const column = document.createElement('div')\n    column.classList.add('column')\n    row.appendChild(column)\n\n    const card = document.createElement('div')\n    card.classList.add('card')\n    column.appendChild(card)\n\n    const form = document.createElement('form')\n    form.classList.add('login-form')\n    card.appendChild(form)\n\n    const formTitleHolder = document.createElement('div')\n    formTitleHolder.classList.add('title-holder')\n    form.appendChild(formTitleHolder)\n\n    const formTitle = document.createElement('h2')\n    formTitle.textContent = 'Log in to your account'\n    formTitleHolder.appendChild(formTitle)\n\n    const unInputHolder = document.createElement('div')\n    unInputHolder.classList.add('input-holder')\n    form.appendChild(unInputHolder)\n\n    const unInput = document.createElement('input')\n    unInput.classList.add('input')\n    unInput.setAttribute('type', 'text')\n    unInput.setAttribute('placeholder', 'Username')\n    unInputHolder.appendChild(unInput)\n\n    const pwdInputHolder = document.createElement('div')\n    pwdInputHolder.classList.add('input-holder')\n    form.appendChild(pwdInputHolder)\n\n    const pwdInput = document.createElement('input')\n    pwdInput.classList.add('input')\n    pwdInput.setAttribute('type', 'password')\n    pwdInput.setAttribute('placeholder', 'Password')\n    pwdInputHolder.appendChild(pwdInput)\n\n    const confirmPwdInputHolder = document.createElement('div')\n    confirmPwdInputHolder.className = 'input-holder invisible'\n    form.appendChild(confirmPwdInputHolder)\n\n    const confirmPwdInput = document.createElement('input')\n    confirmPwdInput.classList.add('input')\n    confirmPwdInput.setAttribute('type', 'password')\n    confirmPwdInput.setAttribute('placeholder', 'Confirm Password')\n    confirmPwdInputHolder.appendChild(confirmPwdInput)\n\n    const innerRow = document.createElement('div')\n    innerRow.classList.add('row')\n    form.appendChild(innerRow)\n\n    const signUpLinkHolder = document.createElement('div')\n    signUpLinkHolder.className = 'column col-half title-holder'\n    innerRow.appendChild(signUpLinkHolder)\n\n    const signUpLink = document.createElement('a')\n    signUpLink.classList.add('login-link')\n    signUpLink.textContent = 'Sign Up'\n    signUpLinkHolder.appendChild(signUpLink)\n\n    const forgotPasswordLinkHolder = document.createElement('div')\n    forgotPasswordLinkHolder.className = 'column col-half title-holder'\n    innerRow.appendChild(forgotPasswordLinkHolder)\n\n    const forgotPasswordLink = document.createElement('a')\n    forgotPasswordLink.classList.add('login-link')\n    forgotPasswordLink.textContent = 'Forgot Password?'\n    forgotPasswordLinkHolder.appendChild(forgotPasswordLink)\n\n    const logInButton = document.createElement('input')\n    logInButton.setAttribute('type', 'submit')\n    logInButton.value = 'Login'\n    logInButton.className = 'btn btn-violet btn-block'\n    form.appendChild(logInButton)\n\n    const login = (e) => {\n      e.preventDefault()\n      this.dataManager.login(unInput.value, pwdInput.value)\n    }\n\n    const register = (e) => {\n      e.preventDefault()\n      if (pwdInput.value === confirmPwdInput.value) {\n        this.dataManager.register(unInput.value, pwdInput.value)\n      }\n    }\n\n    form.addEventListener('submit', login)\n\n    const signUpButton = document.createElement('input')\n    signUpButton.setAttribute('type', 'submit')\n    signUpButton.value = 'Sign up'\n    signUpButton.className = 'btn btn-violet btn-block invisible'\n    form.appendChild(signUpButton)\n\n    function setSignUpState() {\n      logInButton.classList.add('invisible')\n      signUpLink.classList.add('invisible')\n      forgotPasswordLink.classList.add('invisible')\n      signUpButton.classList.remove('invisible')\n      confirmPwdInputHolder.classList.remove('invisible')\n      form.removeEventListener('submit', login)\n      form.addEventListener('submit', register)\n    }\n\n    signUpLink.addEventListener('click', setSignUpState)\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Form);\n\n\n//# sourceURL=webpack:///./src/js/client/form.js?");

/***/ }),

/***/ "./src/js/client/http.js":
/*!*******************************!*\
  !*** ./src/js/client/http.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst http = {\n  async get(url) {\n    const response = await fetch(url)\n    const resData = await response.json()\n    return resData\n  },\n  async post(url, data) {\n    const response = await fetch(url, {\n      method: 'POST',\n      headers: {\n        'Content-type': 'application/json',\n      },\n      body: JSON.stringify(data),\n    })\n    const resData = await response.json()\n    return resData\n  },\n  async put(url, data) {\n    const response = await fetch(url, {\n      method: 'PUT',\n      headers: {\n        'Content-type': 'application/json',\n      },\n      body: JSON.stringify(data),\n    })\n    const resData = await response.json()\n    return resData\n  },\n  async delete(url) {\n    const response = await fetch(url, {\n      method: 'DELETE',\n      headers: {\n        'Content-type': 'application/json',\n      },\n    })\n    const resData = await response.json()\n    return resData\n  },\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (http);\n\n\n//# sourceURL=webpack:///./src/js/client/http.js?");

/***/ }),

/***/ "./src/js/client/pubsub.js":
/*!*********************************!*\
  !*** ./src/js/client/pubsub.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Pubsub {\n  constructor() {\n    this.events = {}\n  }\n\n  subscribe(action, listener) {\n    if (!Object.prototype.hasOwnProperty.call(this.events, action)) {\n      this.events[action] = []\n    }\n    const indexOfAddedListener = this.events[action].push(listener) - 1\n    return function removeListener() {\n      delete this.events[action][indexOfAddedListener]\n    }.bind(this)\n  }\n\n  publish(action, payload) {\n    if (!Object.prototype.hasOwnProperty.call(this.events, action)) return\n\n    this.events[action].forEach((listener) => {\n      listener(payload)\n    })\n  }\n}\n\nconst pubsub = new Pubsub()\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (pubsub);\n\n\n//# sourceURL=webpack:///./src/js/client/pubsub.js?");

/***/ }),

/***/ "./src/js/client/ui.js":
/*!*****************************!*\
  !*** ./src/js/client/ui.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Tasks {\n  constructor(node, setEditState, dataManager, showNotification) {\n    this.node = node\n    this.setEditState = setEditState\n    this.dataManager = dataManager\n    this.showNotification = showNotification\n  }\n\n  render() {\n    if (this.node.children.length) {\n      while (this.node.firstChild) {\n        this.node.firstChild.remove()\n      }\n    }\n\n    this.taskCollection = document.createElement('ul')\n    this.node.appendChild(this.taskCollection)\n\n    this.dataManager.pubsub.subscribe('taskAdded', (addedItem) => {\n      if (!this.taskCollection.classList.contains('task-collection')) {\n        this.taskCollection.classList.add('task-collection')\n      }\n      this.createTaskItem(addedItem)\n      const status = 'success'\n      const msg = `Task \"${addedItem.caption}\" added successfully`\n      this.showNotification(status, msg)\n    })\n\n    this.dataManager.pubsub.subscribe('tasksCleared', () => {\n      if (this.taskCollection.children.length) {\n        this.taskCollection.classList.remove('task-collection')\n        while (this.taskCollection.firstChild) {\n          this.taskCollection.firstChild.remove()\n        }\n        this.showNotification('success', 'All tasks have been deleted')\n      }\n    })\n\n    if (!this.dataManager.getData().length) return\n\n    this.taskCollection.classList.add('task-collection')\n\n    this.dataManager.getData().forEach(task => this.createTaskItem(task))\n  }\n\n  createTaskItem(task) {\n    const li = document.createElement('li')\n    const elementId = task._id\n    li.classList.add('task-item')\n    li.textContent = task.caption\n\n    const deleteItem = document.createElement('span')\n    deleteItem.innerHTML = '&times'\n    deleteItem.classList.add('delete-item-icon')\n    deleteItem.addEventListener('click', () => this.dataManager.removeDataItem(elementId))\n    li.appendChild(deleteItem)\n\n    const editButton = document.createElement('a')\n    editButton.innerHTML = '<span class=\"icon-pencil\"></span>'\n    editButton.classList.add('edit-button-icon')\n    editButton.addEventListener('click', () => {\n      this.setEditState(task)\n    })\n    li.appendChild(editButton)\n\n    const checkBox = document.createElement('input')\n    checkBox.type = 'checkbox'\n    checkBox.id = `checkbox-${elementId}`\n    checkBox.addEventListener('click', () => this.dataManager.checkBoxToggler(task))\n    li.appendChild(checkBox)\n\n    const checkBoxLabel = document.createElement('label')\n    checkBoxLabel.setAttribute('for', checkBox.id)\n    checkBoxLabel.classList.add('checkbox-label')\n    li.appendChild(checkBoxLabel)\n    if (task.completed) {\n      li.classList.add('completed-task')\n      checkBox.setAttribute('checked', true)\n    }\n\n    const removeTaskUpdatedSubscription = this.dataManager.pubsub.subscribe('taskUpdated', (updatedItem) => {\n      if (updatedItem._id === elementId) {\n        const oldText = li.childNodes[0].data\n        const newText = updatedItem.caption\n        li.childNodes[0].data = newText\n        this.showNotification('success', `Task changed from ${oldText} to ${newText}`)\n      }\n    })\n\n    const removeCheckBoxToggledSubscription = this.dataManager.pubsub.subscribe('checkBoxToggled', (checkedItem) => {\n      if (checkedItem._id === elementId) {\n        if (checkedItem.completed) {\n          li.classList.add('completed-task')\n          checkBox.setAttribute('checked', true)\n        } else {\n          li.classList.remove('completed-task')\n          checkBox.removeAttribute('checked')\n        }\n      }\n    })\n\n    const removeRemovedTaskSubscription = this.dataManager.pubsub.subscribe('removedTask', (removedItem) => {\n      if (removedItem._id === elementId) {\n        li.remove()\n        removeTaskUpdatedSubscription()\n        removeCheckBoxToggledSubscription()\n        removeRemovedTaskSubscription()\n        this.showNotification('success', `Task \"${removedItem.caption}\" removed`)\n        if (!this.taskCollection.children.length) {\n          this.taskCollection.classList.remove('task-collection')\n        }\n      }\n    })\n\n\n    this.taskCollection.appendChild(li)\n  }\n}\n\nclass App {\n  constructor(node, dataManager, user) {\n    this.dataManager = dataManager\n    this.node = node\n    this.editState = false\n    this.currentTask = null\n    this.user = user\n  }\n\n  render() {\n    if (this.node.children.length) {\n      while (this.node.firstChild) {\n        this.node.firstChild.remove()\n      }\n    }\n    const wrapper = document.createElement('div')\n    wrapper.classList.add('wrapper')\n    this.node.appendChild(wrapper)\n\n    const notificationHolder = document.createElement('div')\n    notificationHolder.classList.add('notification-holder')\n    wrapper.appendChild(notificationHolder)\n\n    const container = document.createElement('div')\n    container.classList.add('container')\n    wrapper.appendChild(container)\n\n    const row = document.createElement('div')\n    row.classList.add('row')\n    container.appendChild(row)\n\n    const column = document.createElement('div')\n    column.classList.add('column')\n    row.appendChild(column)\n\n    const card = document.createElement('div')\n    card.classList.add('card')\n    column.appendChild(card)\n\n    const logoutBtn = document.createElement('button')\n    logoutBtn.setAttribute('type', 'button')\n    logoutBtn.className = 'btn-sm btn-violet logout-btn'\n    logoutBtn.textContent = 'Log out'\n    card.appendChild(logoutBtn)\n    logoutBtn.addEventListener('click', () => {\n      localStorage.removeItem('userId')\n      localStorage.removeItem('token')\n      this.dataManager.pubsub.publish('loggedOut')\n    })\n\n    const addTaskSection = document.createElement('div')\n    addTaskSection.classList.add('add-tasks-section')\n    card.appendChild(addTaskSection)\n\n    const addTaskSectionTitleHolder = document.createElement('div')\n    addTaskSectionTitleHolder.classList.add('title-holder')\n    addTaskSection.appendChild(addTaskSectionTitleHolder)\n\n    const addTaskSectionTitleHolderH2 = document.createElement('h2')\n    addTaskSectionTitleHolderH2.textContent = 'Add Tasks'\n    addTaskSectionTitleHolder.appendChild(addTaskSectionTitleHolderH2)\n\n    function showNotification(status, msg) {\n      const notification = document.createElement('div')\n      notification.textContent = msg\n      notification.classList.add('notification')\n      notification.classList.add(status === 'success' ? 'notification-success' : 'notification-failure')\n      if (notificationHolder.children.length) {\n        notificationHolder.insertBefore(notification, notificationHolder.firstElementChild)\n      } else {\n        notificationHolder.appendChild(notification)\n      }\n      setTimeout(() => notification.remove(), 5000)\n    }\n\n    const textInput = document.createElement('input')\n    const addTaskHandler = function updateTaskHandler(e) {\n      e.preventDefault()\n      if (!textInput.value) {\n        showNotification('failure', 'You need to input some value!')\n      } else {\n        this.dataManager.addTaskToData(textInput.value, this.user)\n        textInput.value = ''\n      }\n    }.bind(this)\n\n    const updateTaskHandler = function updateTaskHandler(e) {\n      e.preventDefault()\n      if (!textInput.value) {\n        showNotification('failure', 'You need to input some value!')\n      } else {\n        const itemToUpdate = this.currentTask\n        this.dataManager.updateTask(textInput.value, itemToUpdate)\n        removeEditState()\n      }\n    }.bind(this)\n\n    const form = document.createElement('form')\n    form.addEventListener('submit', addTaskHandler)\n    addTaskSection.appendChild(form)\n\n    const addTaskSectionInputHolder = document.createElement('div')\n    addTaskSectionInputHolder.classList.add('input-holder')\n    form.appendChild(addTaskSectionInputHolder)\n\n    textInput.setAttribute('type', 'text')\n    textInput.setAttribute('placeholder', 'Input your Task')\n    textInput.classList.add('input')\n    addTaskSectionInputHolder.appendChild(textInput)\n\n    const submitInput = document.createElement('input')\n    submitInput.setAttribute('type', 'submit')\n    submitInput.classList.add('btn')\n    submitInput.classList.add('btn-violet')\n    submitInput.setAttribute('value', 'Add Task')\n    form.appendChild(submitInput)\n\n    const manageTaskSection = document.createElement('div')\n    manageTaskSection.classList.add('manage-tasks-section')\n    card.appendChild(manageTaskSection)\n    const manageTaskSectionTitleHolder = document.createElement('div')\n    manageTaskSectionTitleHolder.classList.add('title-holder')\n    manageTaskSection.appendChild(manageTaskSectionTitleHolder)\n    const manageTaskSectionH2 = document.createElement('h2')\n    manageTaskSectionH2.textContent = 'Manage Tasks'\n    manageTaskSectionTitleHolder.appendChild(manageTaskSectionH2)\n    const manageTaskSectionInputHolder = document.createElement('div')\n    manageTaskSectionInputHolder.classList.add('input-holder')\n    manageTaskSection.appendChild(manageTaskSectionInputHolder)\n\n    const filterInput = document.createElement('input')\n    filterInput.setAttribute('type', 'text')\n    filterInput.setAttribute('placeholder', 'Filter Tasks')\n    filterInput.classList.add('input')\n    filterInput.addEventListener('keyup', App.filterTasks)\n    manageTaskSectionInputHolder.appendChild(filterInput)\n\n    const tasksNode = document.createElement('div')\n    tasksNode.id = 'tasksNode'\n    manageTaskSection.appendChild(tasksNode)\n\n    const clearTasksButton = document.createElement('button')\n    clearTasksButton.setAttribute('type', 'button')\n    clearTasksButton.className = 'btn btn-black clear-tasks'\n    clearTasksButton.textContent = 'Clear Tasks'\n    clearTasksButton.addEventListener('click', () => {\n      this.dataManager.clearData()\n    })\n    manageTaskSection.appendChild(clearTasksButton)\n\n    const cancelEditStateBtn = document.createElement('input')\n    cancelEditStateBtn.setAttribute('type', 'submit')\n    cancelEditStateBtn.classList.add('btn')\n    cancelEditStateBtn.classList.add('btn-red')\n    cancelEditStateBtn.setAttribute('value', 'Cancel')\n\n    const setEditState = function setEditState(curTask) {\n      this.editState = true\n      form.removeEventListener('submit', addTaskHandler)\n      form.addEventListener('submit', updateTaskHandler)\n      form.appendChild(cancelEditStateBtn)\n      this.currentTask = curTask\n      textInput.value = this.currentTask.caption\n      submitInput.classList.remove('btn-violet')\n      submitInput.classList.add('btn-green')\n      submitInput.setAttribute('value', 'Update Task')\n    }.bind(this)\n\n    const removeEditState = function removeEditState() {\n      this.editState = false\n      this.currentTask = null\n      form.removeEventListener('submit', updateTaskHandler)\n      form.addEventListener('submit', addTaskHandler)\n      form.removeChild(cancelEditStateBtn)\n      textInput.value = ''\n      submitInput.classList.remove('btn-green')\n      submitInput.classList.add('btn-violet')\n      submitInput.setAttribute('value', 'Add Task')\n    }.bind(this)\n\n    cancelEditStateBtn.addEventListener('click', removeEditState)\n\n    const clearTasksHelper = function clearTasksHelper() {\n      if (this.editState) {\n        removeEditState()\n      }\n    }.bind(this)\n\n    this.dataManager.pubsub.subscribe('tasksCleared', clearTasksHelper)\n\n    this.dataManager.pubsub.subscribe('Error', (e) => {\n      const status = 'failure'\n      const msg = `An error occurred: ${e}.`\n      showNotification(status, msg)\n    })\n\n    this.tasks = new Tasks(tasksNode, setEditState, this.dataManager, showNotification)\n\n    this.tasks.render()\n  }\n\n  static filterTasks(e) {\n    const inputtedText = e.target.value.toLowerCase()\n\n    document.querySelectorAll('.task-item').forEach((taskItem) => {\n      const taskItemTextContent = taskItem.textContent\n\n      if (parseInt(taskItemTextContent.toLowerCase().indexOf(inputtedText), 10) !== -1) {\n        taskItem.style.display = 'block'\n      } else {\n        taskItem.style.display = 'none'\n      }\n    })\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n\n//# sourceURL=webpack:///./src/js/client/ui.js?");

/***/ })

/******/ });