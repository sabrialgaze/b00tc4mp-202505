const newPost = document.createElement('div')

{
    const title = util.createTitle(2, 'New post')

    newPost.appendChild(title)

    const form = document.createElement('form')

    form.addEventListener('submit', event => {
        event.preventDefault()

        try {
            const image = imageInput.value
            const text = textInput.value

            logic.createPost(image, text)

            form.reset()

            renderPosts()

            home.removeChild(newPost)

            home.appendChild(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    })

    const imageField = document.createElement('div')
    imageField.classList.add('flex', 'flex-col', 'm-y-10')
    const imageLabel = util.createLabel('image', 'Image')
    imageField.appendChild(imageLabel)
    const imageInput = util.createInput('image', 'url')
    imageField.appendChild(imageInput)
    form.appendChild(imageField)

    const textField = document.createElement('div')
    textField.classList.add('flex', 'flex-col', 'm-y-10')

    const textLabel = util.createLabel('text', 'Text')
    textField.appendChild(textLabel)
    const textInput = util.createInput('text', 'text')
    textField.appendChild(textInput)

    form.appendChild(textField)

    const buttons = document.createElement('div')
    buttons.classList.add('flex', 'justify-end')

    const cancelButton = util.createButton('button', 'Cancel')
    buttons.appendChild(cancelButton)

    cancelButton.addEventListener('click', event => {
        form.reset()

        home.removeChild(newPost)
        home.appendChild(posts)
    })

    const submitButton = util.createButton('submit', 'Create')
    buttons.appendChild(submitButton)

    form.appendChild(buttons)

    newPost.appendChild(form)

    // home.appendChild(newPost)
}