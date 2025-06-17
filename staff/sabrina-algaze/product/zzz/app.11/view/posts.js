const posts = document.createElement('div')

{
    const postsList = document.createElement('ul')
    postsList.classList.add('list-style-none', 'p-0')

    posts.appendChild(postsList)

    home.appendChild(posts)
}

const renderPosts = () => {
    try {
        const allPosts = logic.getPosts()

        const postsList = posts.querySelector('ul')
        postsList.innerHTML = ''

        allPosts.forEach(post => {
            const li = document.createElement('li')

            const author = util.createTitle(3, post.author.username)
            li.appendChild(author)

            const image = document.createElement('img')
            image.classList.add('w-full')
            image.src = post.image = post.image
            li.appendChild(image)

            const caption = document.createElement('p')
            const captionText = document.createTextNode(post.text)
            caption.appendChild(captionText)
            li.appendChild(caption)

            const date = document.createElement('time')
            const dateText = document.createTextNode(post.date)
            date.appendChild(dateText)
            li.appendChild(date)

            if (post.own) {
                const removeButton = util.createButton('button', '🗑')
                li.appendChild(removeButton)

                removeButton.addEventListener('click', event => {
                    if (confirm('Delete post?'))
                        try {
                            logic.removePost(post.id)

                            renderPosts()
                        } catch (error) {
                            console.error(error)

                            alert(error.message)
                        }
                })
            }

            postsList.appendChild(li)
        })
    } catch (error) {
        console.error(error)

        alert(error.message)
    }
}

if (userLoggedIn) renderPosts()