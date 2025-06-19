const login = new Division()

{
    const title = new Title(1, 'Login')

    login.add(title)

    const form = new Form('form')

    form.addSubmitBehavior(() => {
        try {
            const username = usernameInput.getValue()
            const password = passwordInput.getValue()

            logic.loginUser(username, password)

            form.clear()

            const user = logic.getUserInfo()

            const salutation = new Component(home.container.querySelector('p'))
            salutation.container.childNodes[0].remove()
            const salutationText = new Text(`Hello, ${user.name}!`)
            salutation.add(salutationText)

            renderPosts()

            body.remove(login)
            body.add(home)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    })

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

    const submitButton = new Button('submit', 'Login')
    buttons.add(submitButton)

    form.add(buttons)

    login.add(form)

    const registerLink = new Link('', 'Register')

    registerLink.addBehavior('click', () => {
        form.clear()

        body.remove(login)
        body.add(register)
    })

    login.add(registerLink)

    // body.add(login)
}