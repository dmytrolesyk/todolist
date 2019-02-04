class Form {
  constructor(node, dataManager) {
    this.node = node
    this.dataManager = dataManager
    this.state = {
      login: true,
      signup: false,
    }
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

    const form = document.createElement('form')
    form.classList.add('login-form')
    card.appendChild(form)

    const formTitleHolder = document.createElement('div')
    formTitleHolder.classList.add('title-holder')
    form.appendChild(formTitleHolder)

    const formTitle = document.createElement('h2')
    formTitle.textContent = 'Log in to your account'
    formTitleHolder.appendChild(formTitle)

    const unInputHolder = document.createElement('div')
    unInputHolder.classList.add('input-holder')
    form.appendChild(unInputHolder)

    const unInput = document.createElement('input')
    unInput.classList.add('input')
    unInput.setAttribute('type', 'text')
    unInput.setAttribute('placeholder', 'Username')
    unInputHolder.appendChild(unInput)

    const pwdInputHolder = document.createElement('div')
    pwdInputHolder.classList.add('input-holder')
    form.appendChild(pwdInputHolder)

    const pwdInput = document.createElement('input')
    pwdInput.classList.add('input')
    pwdInput.setAttribute('type', 'password')
    pwdInput.setAttribute('placeholder', 'Password')
    pwdInputHolder.appendChild(pwdInput)

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      this.dataManager.login(unInput.value, pwdInput.value)
    })

    const innerRow = document.createElement('div')
    innerRow.classList.add('row')
    form.appendChild(innerRow)

    const signUpLinkHolder = document.createElement('div')
    signUpLinkHolder.className = 'column col-half title-holder'
    innerRow.appendChild(signUpLinkHolder)

    const signUpLink = document.createElement('a')
    signUpLink.classList.add('login-link')
    signUpLink.textContent = 'Sign Up'
    signUpLinkHolder.appendChild(signUpLink)

    const forgotPasswordLinkHolder = document.createElement('div')
    forgotPasswordLinkHolder.className = 'column col-half title-holder'
    innerRow.appendChild(forgotPasswordLinkHolder)

    const forgotPasswordLink = document.createElement('a')
    forgotPasswordLink.classList.add('login-link')
    forgotPasswordLink.textContent = 'Forgot Password?'
    forgotPasswordLinkHolder.appendChild(forgotPasswordLink)

    const logInButton = document.createElement('input')
    logInButton.setAttribute('type', 'submit')
    logInButton.value = 'Login'
    logInButton.className = 'btn btn-violet btn-block'
    form.appendChild(logInButton)
  }
}

export default Form