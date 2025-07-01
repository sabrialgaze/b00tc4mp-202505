const { useState } = React

const Post = ({ post, onPostRemoved }) => {
    const handleDeletePostClick = () => {
        if (confirm('Delete post?')) {
            try {
                logic.removePost(post.id)

                onPostRemoved()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        }
    }

    const handleLikePostClick = () => {
        try {
            logic.likePost(post.id)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Post -> render')

    return <li>
        <h3>{post.author.username}</h3>
        <img
            className="w-full"
            src={post.image}
        />
        <p>{post.text}</p>
        <time>{post.date}</time>
        {post.own && <button type="button" onClick={handleDeletePostClick}>🗑</button>}
        <button type="button" onClick={handleLikePostClick}>👍</button>
    </li>
}