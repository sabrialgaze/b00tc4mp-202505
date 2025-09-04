import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router'

import { useRole } from '../hooks'

import { logic } from '../logic'

import { Posts } from './Posts'

import { SavedPosts } from './SavedPosts'
import { ArchivedPosts } from './ArchivedPosts'
import { LikedPosts } from './LikedPosts'
import { Search } from './Search'
import { NewPost } from './NewPost'

import { MagnifyingGlassIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid, ArchiveBoxIcon as ArchiveBoxIconSolid } from '@heroicons/react/24/solid'


export const Home = ({ onUserLoggedOut, alert }) => {
    const [name, setName] = useState(null)

    const role = useRole()

    const navigate = useNavigate()

    useEffect(() => {
        try {
            logic.getUserInfo()
                .then(user => setName(user.name))
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

    const handleNewPostCancelClick = () => navigate('/')

    const handleNewPostCreated = () => navigate('/')

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
            <p className="text-l text-center font-semibold mb-4">Hello, {name}! <img src={`/images/avatars/${role}.jpg`} /></p>
            <Routes>
                <Route path="/" element={<Posts alert={alert} />} />
                <Route path="/new-post" element={<NewPost onCreated={handleNewPostCreated} onCancelled={handleNewPostCancelClick} alert={alert} />} />
                <Route path="/saved-posts" element={<SavedPosts alert={alert} />} />
                <Route path="/archived-posts" element={<ArchivedPosts alert={alert} />} />
                <Route path="/liked-posts" element={<LikedPosts alert={alert} />} />
                <Route path="/search-posts" element={<Search alert={alert} />} />
            </Routes>
        </div>

        <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
            <button className="w-14 h-14 rounded-full bg=gray-800/80 text-gray-200 text-3xl shadow-lg backdrop-blur-sm hover:bg-gray-800/90 transition" type="button" onClick={handleNewPostClick}>+</button>
        </footer>
    </div>
}