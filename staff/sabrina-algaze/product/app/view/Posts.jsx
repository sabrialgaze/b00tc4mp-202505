import { useState, useEffect } from 'react'

import { Post } from './Post'

import { logic } from '../logic'

export const Posts = () => {
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

    const handlePostLikeToggled = () => {
        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePostSaveToggled = () => {
        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
    const handlePostArchiveToggled = () => {
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
            {posts.map(post => <Post post={post} onPostRemoved={handlePostRemoved} onPostLikeToggled={handlePostLikeToggled} onPostSaveToggled={handlePostSaveToggled} onPostArchiveToggled={handlePostArchiveToggled} />)}
        </ul>
    </div>
}