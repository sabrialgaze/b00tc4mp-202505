const login = document.createElement('div')

{
    const title = util.createTitle(1, 'Login')

    login.appendChild(title)

    const form = document.createElement('form')

    form.addEventListener('submit', event => {
        event.preventDefault()

        try {
            const username = usernameInput.value
            const password = passwordInput.value

            logic.loginUser(username, password)

            form.reset()

            const user = logic.getUserInfo()

            const salutation = home.querySelector('p')
            salutation.childNodes[0].remove()
            const salutationText = document.createTextNode(`Hello, ${user.name}!`)
            salutation.appendChild(salutationText)

            renderPosts()

            body.removeChild(login)
            body.appendChild(home)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    })

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

    const submitButton = util.createButton('submit', 'Login')
    buttons.appendChild(submitButton)

    form.appendChild(buttons)

    login.appendChild(form)

    const registerLink = util.createAnchor('', 'Register')

    registerLink.addEventListener('click', event => {
        event.preventDefault()

        form.reset()

        body.removeChild(login)
        body.appendChild(register)
    })

    login.appendChild(registerLink)

    // body.appendChild(login)
}