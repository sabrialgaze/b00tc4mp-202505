import { useState, useEffect } from 'react'

import { Post } from './Post'

import { logic } from '../logic'

export const LikedPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        try {
            logic.getLikedPosts()
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
    }, [])

    const handlePostRemoved = () => {
        try {
            logic.getLikedPosts()
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

    const handlePostLikeToggled = () => {
        try {
            logic.getLikedPosts()
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

    const handlePostSaveToggled = () => {
        try {
            logic.getLikedPosts()
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

    const handlePostArchiveToggled = () => {
        try {
            logic.getLikedPosts()
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

    console.debug('likedPosts -> render')

    return <div>
        <ul className="list-style-none p-0">
            {posts.map(post => <Post post={post} onPostRemoved={handlePostRemoved} onPostLikeToggled={handlePostLikeToggled} onPostSaveToggled={handlePostSaveToggled} onPostArchiveToggled={handlePostArchiveToggled} />)}
        </ul>
    </div>
}