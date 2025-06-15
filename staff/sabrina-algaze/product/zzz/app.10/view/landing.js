const landing = document.createElement('div')

{
    const title = utils.createTitle(1, 'App')

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