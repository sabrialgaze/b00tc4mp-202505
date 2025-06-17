const register = document.createElement('div')

{
    const title = util.createTitle(1, 'Register')

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
    const nameLabel = util.createLabel('name', 'Name')
    nameField.appendChild(nameLabel)
    const nameInput = util.createInput('name', 'text')
    nameInput.pattern = '^[A-Za-z\\s]+$'
    nameField.appendChild(nameInput)
    form.appendChild(nameField)

    const emailField = document.createElement('div')
    emailField.classList.add('flex', 'flex-col', 'm-y-10')
    const emailLabel = util.createLabel('email', 'E-mail')
    emailField.appendChild(emailLabel)
    const emailInput = util.createInput('email', 'email')
    emailField.appendChild(emailInput)
    form.appendChild(emailField)

    const usernameField = document.createElement('div')
    usernameField.classList.add('flex', 'flex-col', 'm-y-10')
    const usernameLabel = util.createLabel('username', 'Username')
    usernameField.appendChild(usernameLabel)
    const usernameInput = util.createInput('username', 'text')
    usernameInput.pattern = '^[a-zA-Z0-9_]{4,16}$'
    usernameField.appendChild(usernameInput)
    form.appendChild(usernameField)

    const passwordField = document.createElement('div')
    passwordField.classList.add('flex', 'flex-col', 'm-y-10')
    const passwordLabel = util.createLabel('password', 'Password')
    passwordField.appendChild(passwordLabel)
    const passwordInput = util.createInput('password', 'password')
    passwordInput.pattern = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'
    passwordField.appendChild(passwordInput)
    form.appendChild(passwordField)

    const buttons = document.createElement('div')
    buttons.classList.add('flex', 'justify-end')

    const resetButton = util.createButton('reset', 'Clear')
    buttons.appendChild(resetButton)

    const submitButton = util.createButton('submit', 'Register')
    buttons.appendChild(submitButton)

    form.appendChild(buttons)

    register.appendChild(form)

    const loginLink = util.createAnchor('', 'Login')

    loginLink.addEventListener('click', event => {
        event.preventDefault()

        form.reset()

        body.removeChild(register)
        body.appendChild(login)
    })

    register.appendChild(loginLink)

    // body.appendChild(register)
}