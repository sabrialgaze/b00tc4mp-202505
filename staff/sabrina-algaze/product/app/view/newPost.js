const newPost = new Division()

{
    const title = new Title(2, 'New post')

    newPost.add(title)

    const form = new Form()

    form.addSubmitBehavior(() => {
        try {
            const image = imageInput.getValue()
            const text = textInput.getValue()

            logic.createPost(image, text)

            form.clear()

            renderPosts()

            home.remove(newPost)

            home.add(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    })

    const imageField = new Division()
    imageField.addClass('flex', 'flex-col', 'm-y-10')
    const imageLabel = new Label('image', 'Image')
    imageField.add(imageLabel)
    const imageInput = new Input('image', 'url')
    imageField.add(imageInput)
    form.add(imageField)

    const textField = new Division()
    textField.addClass('flex', 'flex-col', 'm-y-10')

    const textLabel = new Label('text', 'Text')
    textField.add(textLabel)
    const textInput = new Input('text', 'text')
    textField.add(textInput)

    form.add(textField)

    const buttons = new Division()
    buttons.addClass('flex', 'justify-end')

    const cancelButton = new Button('button', 'Cancel')
    buttons.add(cancelButton)

    cancelButton.addBehavior('click', () => {
        form.clear()

        home.remove(newPost)
        home.add(posts)
    })

    const submitButton = new Button('submit', 'Create')
    buttons.add(submitButton)

    form.add(buttons)

    newPost.add(form)

    // home.add(newPost)
}