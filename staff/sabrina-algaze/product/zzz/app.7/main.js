let userLoggedIn = false

try {
    userLoggedIn = logic.isUserLoggedIn()
} catch (error) {
    alert(error.message)
}

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

    if (!userLoggedIn)
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

            logic.registerUser(name, email, username, password)

            form.reset()

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

            logic.loginUser(username, password)

            form.reset()

            const user = logic.getUserInfo()

            const salutation = home.querySelector('p')
            salutation.childNodes[0].remove()
            const salutationText = document.createTextNode(`Hello, ${user.name}!`)
            salutation.appendChild(salutationText)

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

    const salutation = document.createElement('p')
    salutation.classList.add('text-center')
    const salutationText = document.createTextNode('Hola, Mundo!')
    salutation.appendChild(salutationText)

    home.appendChild(salutation)

    const logoutButton = document.createElement('button')
    logoutButton.type = 'button'
    logoutButtonText = document.createTextNode('Logout')
    logoutButton.appendChild(logoutButtonText)

    home.appendChild(logoutButton)

    logoutButton.addEventListener('click', event => {
        event.preventDefault()
        try {
            logic.logoutUser()

            body.removeChild(home)
            body.appendChild(login)
        } catch (error) {
            alert(error.message)
        }
    })

    const newPostButton = document.createElement('button')
    newPostButton.type = 'button'
    newPostButtonText = document.createTextNode('+')
    newPostButton.appendChild(newPostButtonText)

    home.appendChild(newPostButton)

    newPostButton.addEventListener('click', event => {
        event.preventDefault()

        home.removeChild(posts)

        home.appendChild(createPost)
    })

    if (userLoggedIn)
        try {
            const user = logic.getUserInfo()

            salutation.childNodes[0].remove()
            const salutationText = document.createTextNode(`Hello, ${user.name}!`)
            salutation.appendChild(salutationText)

            body.appendChild(home)
        } catch (error) {
            alert(error.message)
        }

}

const createPost = document.createElement('div')

{
    const title = document.createElement('h2')
    const titleText = document.createTextNode('New post')
    title.appendChild(titleText)

    createPost.appendChild(title)

    const form = document.createElement('form')

    form.addEventListener('submit', event => {
        event.preventDefault()

        try {
            const image = imageInput.value
            const text = textInput.value

            logic.createPost(image, text)

            form.reset()

            const postsList = posts.querySelector('ul')

            // Array.prototype.forEach.call(list.appendChild, child => child.remove())
            // Array.prototype.forEach.call(list.appendChild, child => list.removeChild(child))
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

            home.removeChild(createPost)

            home.appendChild(posts)
        } catch (error) {
            alert(error.message)
        }
    })

    const imageField = document.createElement('div')
    imageField.classList.add('flex', 'flex-col', 'm-y-10')

    const imageLabel = document.createElement('label')
    imageLabel.htmlFor = 'image'
    const imageLabelText = document.createTextNode('Image')
    imageLabel.appendChild(imageLabelText)
    imageField.appendChild(imageLabel)

    const imageInput = document.createElement('input')
    imageInput.id = 'image'
    imageInput.type = 'url'
    imageField.appendChild(imageInput)

    form.appendChild(imageField)

    const textField = document.createElement('div')
    textField.classList.add('flex', 'flex-col', 'm-y-10')

    const textLabel = document.createElement('label')
    textLabel.htmlFor = 'text'
    const textLabelText = document.createTextNode('Text')
    textLabel.appendChild(textLabelText)
    textField.appendChild(textLabel)

    const textInput = document.createElement('input')
    textInput.id = 'text'
    textInput.type = 'text'
    textField.appendChild(textInput)

    form.appendChild(textField)

    const buttons = document.createElement('div')
    buttons.classList.add('flex', 'justify-end')

    const cancelButton = document.createElement('button')
    cancelButton.type = 'button'
    const cancelButtonText = document.createTextNode('Cancel')
    cancelButton.appendChild(cancelButtonText)

    cancelButton.addEventListener('click', event => {
        form.reset()

        home.removeChild(createPost)
        home.appendChild(posts)
    })

    buttons.appendChild(cancelButton)

    const submitButton = document.createElement('button')
    submitButton.type = 'submit'
    const submitButtonText = document.createTextNode('Create')
    submitButton.appendChild(submitButtonText)

    buttons.appendChild(submitButton)

    form.appendChild(buttons)

    createPost.appendChild(form)

    // home.appendChild(createPost)
}

const posts = document.createElement('div')

{
    try {
        const postsList = document.createElement('ul')

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

        posts.appendChild(postsList)
    } catch (error) {
        alert(error.message)
    }

    home.appendChild(posts)
}