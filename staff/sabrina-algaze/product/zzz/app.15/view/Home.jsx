const { useState, useEffect } = React

const Home = () => {
    const [name, setName] = useState('')
    const [posts, setPosts] = useState([])
    const [view, setView] = useState('posts')

    console.debug('Home -> render')

    useEffect(() => {
        try {
            const user = logic.getUserInfo()

            setName(user.name)

            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleNewPostClick = () => setView('new-post')

    const handleNewPostCancelClick = () => setView('posts')

    const handleNewPostSubmit = event => {
        event.preventDefault()

        const form = event.target

        const image = form.image.value
        const text = form.text.value

        try {
            logic.createPost(image, text)

            form.reset()

            const posts = logic.getPosts()

            setPosts(posts)

            setView('posts')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeletePostClick = postId => {
        if (confirm('Delete post?')) {
            try {
                logic.removePost(postId)

                const posts = logic.getPosts()

                setPosts(posts)
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        }
    }

    return <div>
        <h1>App</h1>
        <p className="text-center">Hello, {name}!</p>
        <button type="button">Logout</button>
        <button type="button" onClick={handleNewPostClick}>+</button>
        {view === 'posts' && <div>
            <ul className="list-style-none p-0">
                {posts.map(post => <li>
                    <h3>{post.author.username}</h3>
                    <img
                        className="w-full"
                        src={post.image}
                    />
                    <p>{post.text}</p>
                    <time>{post.date}</time>
                    {post.own && <button type="button" onClick={() => handleDeletePostClick(post.id)}>🗑</button>}
                </li>)}
            </ul>
        </div>}
        {view === 'new-post' && <div>
            <h2>New post</h2>
            <form onSubmit={handleNewPostSubmit}>
                <div className="flex flex-col m-y-10">
                    <label htmlFor="image">Image</label>
                    <input id="image" type="url" />
                </div>
                <div className="flex flex-col m-y-10">
                    <label htmlFor="text">Text</label>
                    <input id="text" type="text" />
                </div>
                <div className="flex justify-end">
                    <button type="button" onClick={handleNewPostCancelClick}>Cancel</button>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>}

    </div>
}