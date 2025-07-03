import { useState, useEffect } from 'react'

import { Posts } from './Posts'

import { SavedPosts } from './SavedPosts'

import { logic } from '../logic'
import { ArchivedPosts } from './ArchivedPosts'

export const Home = ({ onUserLoggedOut }) => {
    const [name, setName] = useState('')

    const [view, setView] = useState('posts')

    useEffect(() => {
        try {
            const user = logic.getUserInfo()

            setName(user.name)
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

            setView('posts')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onUserLoggedOut()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleSavedPostsClick = event => {
        event.preventDefault()

        setView('saved-posts')
    }

    const handleArchivedPostsClick = event => {
        event.preventDefault()

        setView('archived-posts')
    }

    const handleAppClick = event => {
        event.preventDefault()

        setView('posts')
    }

    console.debug('Home -> render')

    return <div>
        <h1><a href="" onClick={handleAppClick}>App</a></h1>
        <p className="text-center">Hello, {name}!</p>
        <button type="button" onClick={handleLogoutClick}>Logout</button>
        <button type="button" onClick={handleNewPostClick}>+</button>
        <a href="" onClick={handleSavedPostsClick}>Saved </a>
        <a href="" onClick={handleArchivedPostsClick}> Archived</a>
        {view === 'posts' && <Posts />}
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
        {view === 'saved-posts' && <SavedPosts />}
        {view === 'archived-posts' && <ArchivedPosts />}
    </div>
}