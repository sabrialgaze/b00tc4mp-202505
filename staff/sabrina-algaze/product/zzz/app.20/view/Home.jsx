import { useState, useEffect } from 'react'

import { Routes, Route, useNavigate, Link } from 'react-router'

import { logic } from '../logic'

import { Posts } from './Posts'

import { SavedPosts } from './SavedPosts'
import { ArchivedPosts } from './ArchivedPosts'
import { LikedPosts } from './LikedPosts'
import { Search } from './Search'

export const Home = ({ onUserLoggedOut }) => {
    const [name, setName] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        try {
            logic.getUserInfo()
                .then(user => {
                    setName(user.name)
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

    const handleNewPostClick = () => navigate('/new-post')

    const handleNewPostCancelClick = () => navigate('/posts')

    const handleNewPostSubmit = event => {
        event.preventDefault()

        const form = event.target

        const image = form.image.value
        const text = form.text.value

        try {
            logic.createPost(image, text)
                .then(() => {
                    form.reset()

                    navigate('/')
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

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onUserLoggedOut()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Home -> render')

    return <div>
        <h1><Link to="/">App</Link></h1>
        <p className="text-center">Hello, {name}!</p>
        <button type="button" onClick={handleLogoutClick}>Logout</button>
        <button type="button" onClick={handleNewPostClick}>+</button>
        <Link to="/saved-posts">Saved</Link>
        <Link to="/archived-posts">Archived</Link>
        <Link to="/liked-posts">Liked</Link>
        <Link to="/search-posts">Search</Link>

        <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/new-posts" element={<div>
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
            </div>} />
            <Route path="/saved-posts" element={<SavedPosts />} />
            <Route path="/archived-posts" element={<ArchivedPosts />} />
            <Route path="/liked-posts" element={<LikedPosts />} />
            <Route path="/search-posts" element={<Search />} />
        </Routes>
    </div>
}