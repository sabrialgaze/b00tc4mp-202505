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

    const handlePostRemoved = () => {
        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Posts -> render')

    return <div>
        <ul className="list-style-none p-0">
            {posts.map(post => <Post post={post} onPostRemoved={handlePostRemoved} />)}
        </ul>
    </div>
}