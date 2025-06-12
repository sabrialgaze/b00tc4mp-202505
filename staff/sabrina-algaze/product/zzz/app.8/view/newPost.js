const newPost = document.createElement('div')

{
    const title = document.createElement('h2')
    const titleText = document.createTextNode('New post')
    title.appendChild(titleText)

    newPost.appendChild(title)

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

            home.removeChild(newPost)

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