import { useState, useEffect } from 'react'

import { Post } from './Post'

import { logic } from '../logic'

export const SavedPosts = ({ alert, confirm }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        try {
            logic.getSavedPosts()
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
            logic.getSavedPosts()
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
            logic.getSavedPosts()
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
            logic.getSavedPosts()
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
            logic.getSavedPosts()
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

    console.debug('SavedPosts -> render')

    return <div>
        <ul className="list-style-none p-0">
            {posts.map(post => <Post key={post.id} post={post} onPostRemoved={handlePostRemoved} onPostLikeToggled={handlePostLikeToggled} onPostSaveToggled={handlePostSaveToggled} onPostArchiveToggled={handlePostArchiveToggled} alert={alert} confirm={confirm} />)}
        </ul>
    </div>
}

