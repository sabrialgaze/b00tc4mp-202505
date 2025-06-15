const register = document.createElement('div')

{
    const title = utils.createTitle(1, 'Register')

    register.appendChild(title)

    const form = document.createElement('form')

    form.addEventListener('submit', event => {
        event.preventDefault()

        try {
            const name = nameInput.value
            const email = emailInput.value
            const username = usernameInput.value
            const password = passwordInput.value

            logic.registerUser(name, email, username, password)

            form.reset()

            body.removeChild(register)
            body.appendChild(login)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    })

    const nameField = document.createElement('div')
    nameField.classList.add('flex', 'flex-col', 'm-y-10')

    const nameLabel = document.createElement('label')
    nameLabel.htmlFor = 'name'
    const nameLabelText = document.createTextNode('Name')
    nameLabel.appendChild(nameLabelText)
    nameField.appendChild(nameLabel)

    form.appendChild(nameField)

    register.appendChild(form)

    const nameInput = document.createElement('input')
    nameInput.id = 'name'
    nameInput.type = 'text'
    nameInput.pattern = '^[A-Za-z\\s]+$'
    nameField.appendChild(nameInput)


    const emailField = document.createElement('div')
    emailField.classList.add('flex', 'flex-col', 'm-y-10')

    const emailLabel = document.createElement('label')
    emailLabel.htmlFor = 'email'
    const emailLabelText = document.createTextNode('E-mail')
    emailLabel.appendChild(emailLabelText)
    emailField.appendChild(emailLabel)

    form.appendChild(emailField)

    const emailInput = document.createElement('input')
    emailInput.id = 'email'
    emailInput.type = 'email'
    emailField.appendChild(emailInput)


    const usernameField = document.createElement('div')
    usernameField.classList.add('flex', 'flex-col', 'm-y-10')

    const usernameLabel = document.createElement('label')
    usernameLabel.htmlFor = 'username'
    usernameLabelText = document.createTextNode('Username')
    usernameLabel.appendChild(usernameLabelText)
    usernameField.appendChild(usernameLabel)

    const usernameInput = document.createElement('input')
    usernameInput.id = 'username'
    usernameInput.type = 'text'
    usernameInput.pattern = '^[a-zA-Z0-9_]{4,16}$'
    usernameField.appendChild(usernameInput)

    form.appendChild(usernameField)


    const passwordField = document.createElement('div')
    passwordField.classList.add('flex', 'flex-col', 'm-y-10')

    const passwordLabel = document.createElement('label')
    passwordLabel.htmlFor = 'password'
    const passwordLabelText = document.createTextNode('Password')
    passwordLabel.appendChild(passwordLabelText)

    passwordField.appendChild(passwordLabel)

    const passwordInput = document.createElement('input')
    passwordInput.id = 'password'
    passwordInput.type = 'password'
    passwordInput.pattern = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'

    passwordField.appendChild(passwordInput)

    form.appendChild(passwordField)


    const buttons = document.createElement('div')
    buttons.classList.add('flex', 'justify-end')

    const resetButton = document.createElement('button')
    resetButton.type = 'reset'
    const resetButtonText = document.createTextNode('Clear')
    resetButton.appendChild(resetButtonText)

    buttons.appendChild(resetButton)

    const submitButton = document.createElement('button')
    submitButton.type = 'submit'
    const submitButtonText = document.createTextNode('Register')
    submitButton.appendChild(submitButtonText)

    buttons.appendChild(submitButton)

    form.appendChild(buttons)

    const loginLink = document.createElement('a')
    loginLink.href = ""
    const loginLinkText = document.createTextNode('Login')
    loginLink.appendChild(loginLinkText)

    loginLink.addEventListener('click', event => {
        event.preventDefault()

        form.reset()

        body.removeChild(register)
        body.appendChild(login)
    })

    register.appendChild(loginLink)

    // body.appendChild(register)
}