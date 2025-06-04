const users = [{
    name: 'Peter Pan',
    email: 'peter@pan.com',
    username: 'peterpan',
    password: '123123123'
}]

// const body = document.querySelector('body')
const body = document.body

const landing = document.createElement('div')

{
    const title = document.createElement('h1')
    const titleText = document.createTextNode('App')
    title.appendChild(titleText)
    landing.appendChild(title)

    const navigations = document.createElement('p')
    navigations.classList.add('text-center')

    const registerLink = document.createElement('a')
    registerLink.href = ""
    const registerLinkText = document.createTextNode('Register')
    registerLink.appendChild(registerLinkText)
    navigations.appendChild(registerLink)

    registerLink.addEventListener('click', event => {
        event.preventDefault()
        body.removeChild(landing)
        body.appendChild(register)
    })

    const orText = document.createTextNode(' or ')
    navigations.appendChild(orText)

    const loginLink = document.createElement('a')
    loginLink.href = ""
    const loginLinkText = document.createTextNode('Login')
    loginLink.appendChild(loginLinkText)
    navigations.appendChild(loginLink)

    loginLink.addEventListener('click', event => {
        event.preventDefault()
        body.removeChild(landing)
        body.appendChild(login)
    })

    landing.appendChild(navigations)

    body.appendChild(landing)
}

const register = document.createElement('div')

{
    const title = document.createElement('h1')
    const titleText = document.createTextNode('Register')
    title.appendChild(titleText)

    register.appendChild(title)

    const form = document.createElement('form')

    form.addEventListener('submit', event => {
        event.preventDefault()

        try {
            const name = nameInput.value
            const email = emailInput.value
            const username = usernameInput.value
            const password = passwordInput.value

            // TODO check if user exists (by email and/or username), in case it does, then show error 'user already exists', otherwise continue

            let user = users.find(user => user.email === email || user.username === username)

            if (user) throw new Error('user already exists')

            user = { name, email, username, password }

            // for (let i = 0; i < users.length; i++) {
            //     if (users[i].email === email || users[i].username === username) {
            //         throw new Error('Email or username already exist')
            //     }
            // } 

            users.push(user)

            form.reset()

            //TODO navigate to Login
            body.removeChild(register)
            body.appendChild(login)
        } catch (error) {
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
    emailInput.type = 'text'
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

const login = document.createElement('div')

{
    const title = document.createElement('h1')
    const titleText = document.createTextNode('Login')
    title.appendChild(titleText)

    login.appendChild(title)

    const form = document.createElement('form')

    form.addEventListener('submit', event => {
        event.preventDefault()

        try {
            const username = usernameInput.value
            const password = passwordInput.value

            // for (let i = 0; i < users.length; i++) {
            //     if (users[i].username === username && users[i].password === password) {
            //         body.removeChild(login)
            //         body.appendChild(home)
            //     } else {
            //         throw new Error('username or password are not correct')
            //     }
            // }
            const user = users.find(user => user.username === username)

            if (!user) throw new Error('user not found')

            if (user.password !== password) throw new Error('wrong password')

            form.reset()

            body.removeChild(login)
            body.appendChild(home)

        } catch (error) {
            alert(error.message)
        }
    })

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
    const submitButtonText = document.createTextNode('Login')
    submitButton.appendChild(submitButtonText)

    buttons.appendChild(submitButton)

    form.appendChild(buttons)

    login.appendChild(form)

    const registerLink = document.createElement('a')
    registerLink.href = ""
    const registerLinkText = document.createTextNode('Register')
    registerLink.appendChild(registerLinkText)

    registerLink.addEventListener('click', event => {
        event.preventDefault()

        form.reset()

        body.removeChild(login)
        body.appendChild(register)
    })

    login.appendChild(registerLink)

    // body.appendChild(login)
}

const home = document.createElement('div')

{
    const title = document.createElement('h1')
    const titleText = document.createTextNode('App')
    title.appendChild(titleText)

    home.appendChild(title)

    const welcome = document.createElement('p')
    welcome.classList.add('text-center')
    const welcomeText = document.createTextNode('Hola, Mundo!')
    welcome.appendChild(welcomeText)

    home.appendChild(welcome)

    const logoutButton = document.createElement('button')
    logoutButton.type = 'button'
    logoutButtonText = document.createTextNode('Logout')
    logoutButton.appendChild(logoutButtonText)

    home.appendChild(logoutButton)

    logoutButton.addEventListener('click', event => {
        event.preventDefault()

        body.removeChild(home)
        body.appendChild(login)
    })


    // body.appendChild(home)
}