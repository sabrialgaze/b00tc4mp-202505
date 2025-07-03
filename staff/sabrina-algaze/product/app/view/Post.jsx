import { logic } from '../logic'

export const Post = ({ post, onPostRemoved, onPostLikeToggled, onPostSaveToggled, onPostArchiveToggled }) => {
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

    const handleToggleLikePostClick = () => {
        try {
            logic.toggleLikePost(post.id)

            onPostLikeToggled()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleToggleSavePostClick = () => {
        try {
            logic.toggleSavePost(post.id)

            onPostSaveToggled()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleToggleArchivePostClick = () => {
        if (confirm(`${post.archived ? 'Unarchive' : 'Archive'} post?`)) {
            try {
                logic.toggleArchivePost(post.id)

                onPostArchiveToggled()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
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
        <button type="button" onClick={handleToggleLikePostClick}>{post.liked ? '❤️' : '🤍'} ({post.likesCount})</button>
        <button type="button" onClick={handleToggleSavePostClick}>{post.saved ? '🇺🇳' : '🏳️'}</button>
        {post.own && <button type="button" onClick={handleToggleArchivePostClick}>{post.archived ? '🗄' : '📁'}</button>}
        {post.own && <button type="button" onClick={handleDeletePostClick}>🗑</button>}
    </li>
}