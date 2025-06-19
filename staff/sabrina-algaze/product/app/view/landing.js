const landing = new Division()

{
    const title = new Title(1, 'App')

    landing.add(title)

    const navigations = new Paragraph()
    navigations.addClass('text-center')

    const registerLink = new Link('', 'Register')
    navigations.add(registerLink)

    registerLink.addBehavior('click', event => {
        body.remove(landing)
        body.add(register)
    })

    const orText = new Text(' or ')
    navigations.add(orText)

    const loginLink = new Link('', 'Login')
    navigations.add(loginLink)

    loginLink.addBehavior('click', event => {
        body.remove(landing)
        body.add(login)
    })

    landing.add(navigations)

    if (!userLoggedIn)
        body.add(landing)
}