const login = document.createElement('div')

{
    const title = utils.createTitle(1, 'Login')

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

            const postsList = posts.querySelector('ul')

            postsList.innerHTML = ''

            const allPosts = logic.getPosts()

            allPosts.forEach(post => {
                const li = document.createElement('li')

                const author = document.createElement('h3')
                const authorText = document.createTextNode(post.author)
                author.appendChild(authorText)
                li.appendChild(author)

                const image = document.createElement('img')
                image.src = post.image
                li.appendChild(image)

                const caption = document.createElement('p')
                const captionText = document.createTextNode(post.text)
                caption.appendChild(captionText)
                li.appendChild(caption)

                const date = document.createElement('time')
                const dateText = document.createTextNode(post.date)
                date.appendChild(dateText)
                li.appendChild(date)

                postsList.appendChild(li)
            })

            body.removeChild(login)
            body.appendChild(home)
        } catch (error) {
            console.error(error)

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