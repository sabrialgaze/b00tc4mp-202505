import { useState, useEffect } from 'react'

import { useContext } from '../hooks'

import { Post } from './Post'

import { logic } from '../logic'

export const Posts = () => {
    const [posts, setPosts] = useState([])

    const { alert } = useContext()

    const loadPosts = () => {
        try {
            logic.getPosts()
                .then(posts => {
                    setPosts(posts)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    useEffect(() => loadPosts(), [])

    const handlePostRemoved = () => loadPosts()

    const handlePostLikeToggled = () => loadPosts()

    const handlePostSaveToggled = () => loadPosts()

    const handlePostArchiveToggled = () => loadPosts()

    console.debug('Posts -> render')

    return <div>
        <ul className="list-style-none p-0">
            {posts.map(post => <Post key={post.id} post={post} onPostRemoved={handlePostRemoved} onPostLikeToggled={handlePostLikeToggled} onPostSaveToggled={handlePostSaveToggled} onPostArchiveToggled={handlePostArchiveToggled} />)}
        </ul>
    </div>
}