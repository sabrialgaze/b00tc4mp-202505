const posts = document.createElement('div')

{
    const postsList = document.createElement('ul')

    if (userLoggedIn) {
        try {

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
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    posts.appendChild(postsList)

    home.appendChild(posts)
}