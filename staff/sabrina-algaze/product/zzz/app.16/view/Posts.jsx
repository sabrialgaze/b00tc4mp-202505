const { useState, useEffect } = React

const Posts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

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

    console.debug('Posts -> render')

    return <div>
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
    </div>
}