const home = new Division()

{
    const title = new Title(1, 'App')

    home.add(title)

    const salutation = new Paragraph()
    salutation.addClass('text-center')
    let salutationText = new Text('Hola, Mundo!')
    salutation.add(salutationText)

    home.add(salutation)

    const logoutButton = new Button('button', 'Logout')

    home.add(logoutButton)

    logoutButton.addBehavior('click', () => {
        try {
            logic.logoutUser()

            body.remove(home)
            body.add(login)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    })

    const newPostButton = new Button('button', '+')

    home.add(newPostButton)

    newPostButton.addBehavior('click', () => {
        home.remove(posts)

        home.add(newPost)
    })

    if (userLoggedIn)
        try {
            const user = logic.getUserInfo()

            salutation.remove(salutationText)
            salutationText = new Text(`Hello, ${user.name}!`)
            salutation.add(salutationText)

            body.add(home)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

}
