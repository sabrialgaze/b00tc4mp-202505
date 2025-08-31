import { useState, useEffect } from 'react'

import { Routes, Route, useNavigate, Link } from 'react-router'

import { logic } from '../logic'

import { Posts } from './Posts'

import { SavedPosts } from './SavedPosts'
import { ArchivedPosts } from './ArchivedPosts'
import { LikedPosts } from './LikedPosts'
import { Search } from './Search'

import { MagnifyingGlassIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid, ArchiveBoxIcon as ArchiveBoxIconSolid } from '@heroicons/react/24/solid'


export const Home = ({ onUserLoggedOut }) => {
    const [name, setName] = useState(null)
    const [role, setRole] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        try {
            logic.getUserInfo()
                .then(user => {
                    const role = logic.getUserRole()

                    setName(user.name)
                    setRole(role)
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
        <header className="fixed top-0 w-full backdrop-blur-sm">
            <nav className="flex justify-between items-center p-4 ">
                <h1 className="text-3xl font-semibold"><Link to="/">App</Link></h1>
                <Link to="/liked-posts"><HeartIconSolid className="w-5 h-5 text-gray-700" /></Link>
                <Link to="/saved-posts"><BookmarkIconSolid className="w-5 h-5 text-gray-700" /></Link>
                <Link to="/archived-posts"><ArchiveBoxIconSolid className="w-5 h-5 text-gray-700" /></Link>
                <Link to="/search-posts"><MagnifyingGlassIcon className="w-5 h-5 text-gray-700" /></Link>
                <button type="button" onClick={handleLogoutClick}><ArrowLeftStartOnRectangleIcon className="w-5 h-5 text-gray-700" /></button>
            </nav>
        </header>

        <div className="py-15">
            <p className="text-l text-center font-semibold mb-4">Hello, {name}! <img src={`/images/avatar/${role}.jpg`} /></p>
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/new-post" element={<div>
                    <h2 className="font-semibold text-lg">New post</h2>
                    <form className="flex flex-col gap-1" onSubmit={handleNewPostSubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="image">Image</label>
                            <input className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" id="image" type="url" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="text">Text</label>
                            <input className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" id="text" type="text" />
                        </div>
                        <div className="flex justify-end mt-2 gap-1">
                            <button className="rounded-full px-3 py-1 border text-gray-700 hover:bg-gray-100 transition" type="button" onClick={handleNewPostCancelClick}>Cancel</button>
                            <button className="rounded-full px-3 py-1 bg-gray-900 text-white hover:bg-gray-700 transition" type="submit">Create</button>
                        </div>
                    </form>
                </div>} />
                <Route path="/saved-posts" element={<SavedPosts />} />
                <Route path="/archived-posts" element={<ArchivedPosts />} />
                <Route path="/liked-posts" element={<LikedPosts />} />
                <Route path="/search-posts" element={<Search />} />
            </Routes>
        </div>

        <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
            <button className="w-14 h-14 rounded-full bg=gray-800/80 text-gray-200 text-3xl shadow-lg backdrop-blur-sm hover:bg-gray-800/90 transition" type="button" onClick={handleNewPostClick}>+</button>
        </footer>
    </div>
}