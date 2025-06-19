const register = new Division()

{
    const title = new Title(1, 'Register')

    register.add(title)

    const form = new Form()

    form.addSubmitBehavior(() => {
        try {
            const name = nameInput.getValue()
            const email = emailInput.getValue()
            const username = usernameInput.getValue()
            const password = passwordInput.getValue()

            logic.registerUser(name, email, username, password)

            form.clear()

            body.remove(register)
            body.add(login)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    })

    const nameField = new Division()
    nameField.addClass('flex', 'flex-col', 'm-y-10')
    const nameLabel = new Label('name', 'Name')
    nameField.add(nameLabel)
    const nameInput = new Input('name', 'text', '^[A-Za-z\\s]+$')
    nameField.add(nameInput)
    form.add(nameField)

    const emailField = new Division()
    emailField.addClass('flex', 'flex-col', 'm-y-10')
    const emailLabel = new Label('email', 'E-mail')
    emailField.add(emailLabel)
    const emailInput = new Input('email', 'email')
    emailField.add(emailInput)
    form.add(emailField)

    const usernameField = new Division()
    usernameField.addClass('flex', 'flex-col', 'm-y-10')
    const usernameLabel = new Label('username', 'Username')
    usernameField.add(usernameLabel)
    const usernameInput = new Input('username', 'text', '^[a-zA-Z0-9_]{4,16}$')
    usernameField.add(usernameInput)
    form.add(usernameField)

    const passwordField = new Division()
    passwordField.addClass('flex', 'flex-col', 'm-y-10')
    const passwordLabel = new Label('password', 'Password')
    passwordField.add(passwordLabel)
    const passwordInput = new Input('password', 'password', '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')
    passwordField.add(passwordInput)
    form.add(passwordField)

    const buttons = new Division()
    buttons.addClass('flex', 'justify-end')

    const resetButton = new Button('reset', 'Clear')
    buttons.add(resetButton)

    const submitButton = new Button('submit', 'Register')
    buttons.add(submitButton)

    form.add(buttons)

    register.add(form)

    const loginLink = new Link('', 'Login')

    loginLink.addBehavior('click', () => {
        form.clear()

        body.remove(register)
        body.add(login)
    })

    register.add(loginLink)

    // body.add(register)
}