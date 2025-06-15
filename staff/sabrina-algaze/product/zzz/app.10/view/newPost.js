const newPost = document.createElement('div')

{
    const title = utils.createTitle(2, 'New post')

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

        home.removeChild(newPost)
        home.appendChild(posts)
    })

    buttons.appendChild(cancelButton)

    const submitButton = document.createElement('button')
    submitButton.type = 'submit'
    const submitButtonText = document.createTextNode('Create')
    submitButton.appendChild(submitButtonText)

    buttons.appendChild(submitButton)

    form.appendChild(buttons)

    newPost.appendChild(form)

    // home.appendChild(newPost)
}