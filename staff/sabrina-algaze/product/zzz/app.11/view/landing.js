const landing = document.createElement('div')

{
    const title = util.createTitle(1, 'App')

    landing.appendChild(title)

    const navigations = document.createElement('p')
    navigations.classList.add('text-center')

    const registerLink = util.createAnchor('', 'Register')
    navigations.appendChild(registerLink)

    registerLink.addEventListener('click', event => {
        event.preventDefault()
        body.removeChild(landing)
        body.appendChild(register)
    })

    const orText = document.createTextNode(' or ')
    navigations.appendChild(orText)

    const loginLink = util.createAnchor('', 'Login')
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