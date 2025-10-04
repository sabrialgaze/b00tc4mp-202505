// import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router'

import { ArrowRightStartOnRectangleIcon, CalendarIcon, BanknotesIcon } from '@heroicons/react/24/outline'

import { logic } from '../logic'
import { Trainings } from './Trainings'

export const Home = ({ onUserLoggedOut }) => {
    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onUserLoggedOut()
        } catch (error) {
            console.error(error)

            alert(error.message
            )
        }
    }

    console.debug('Home -> render')

    return <div>
        <header className="fixed top-0 w-full backdrop-blur-sm">
            <nav className="flex justify-between items-center p-4 ">
                <h1 className="text-3xl font-semibold"><Link to="/">Count.in</Link></h1>
                <button type="button" onClick={handleLogoutClick}><ArrowRightStartOnRectangleIcon className="w-5 h-5 text-gray-700" /></button>
            </nav>
        </header>

        <div className="py-20">
            <Routes>
                <Route path="/" element={<Trainings />} />
            </Routes>
        </div>

        <footer className="fixed bottom-0 left-0 right-0 py-6 bg-gray-300">
            <div className="flex justify-center space-x-4">
                <button type="button"><CalendarIcon className="w-10 h-10 text-gray-700" /></button>
                <button type="button"><BanknotesIcon className="w-10 h-10 text-gray-700" /></button>
            </div>

        </footer>
    </div>
}
