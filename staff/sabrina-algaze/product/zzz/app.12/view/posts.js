const posts = new Division()

{
    const postsList = new List()
    postsList.addClass('list-style-none', 'p-0')

    posts.add(postsList)

    home.add(posts)
}

const renderPosts = () => {
    try {
        const allPosts = logic.getPosts()

        // const postsList = new Component(posts.container.querySelector('ul'))
        const postsList = posts.children[0]
        postsList.removeAll()

        allPosts.forEach(post => {
            const li = new ListItem()

            const author = new Title(3, post.author.username)
            li.add(author)

            const image = new Image(post.image)
            image.addClass('w-full')
            li.add(image)

            const caption = new Paragraph()
            const captionText = new Text(post.text)
            caption.add(captionText)
            li.add(caption)

            const date = new Time()
            const dateText = new Text(post.date)
            date.add(dateText)
            li.add(date)

            if (post.own) {
                const removeButton = new Button('button', '🗑')
                li.add(removeButton)

                removeButton.addBehavior('click', () => {
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

            postsList.add(li)
        })
    } catch (error) {
        console.error(error)

        alert(error.message)
    }
}

if (userLoggedIn) renderPosts()