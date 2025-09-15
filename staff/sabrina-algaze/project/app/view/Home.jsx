// import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router'

import { ArrowLeftStartOnRectangleIcon, CalendarIcon, BanknotesIcon } from '@heroicons/react/24/outline'

import { logic } from '../logic'

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
                <button type="button" onClick={handleLogoutClick}><ArrowLeftStartOnRectangleIcon className="w-5 h-5 text-gray-700" /></button>
            </nav>
        </header>

        <div className="py-15">
            <div className="border-2 border-black-600 bg-green-100 p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-lg font-semibold text-left">Date - Group X</div>
                        <div className="text-sm text-left mt-1">Coach</div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-600">n players</div>
                        <div className="text-sm text-gray-600 mt-1">n/n</div>
                    </div>
                </div>
            </div>
        </div>

        <footer className="fixed bottom-0 left-0 right-0 py-6 bg-gray-300">
            <div className="flex justify-center space-x-4">
                <button type="button"><CalendarIcon className="w-10 h-10 text-gray-700" /></button>
                <button type="button"><BanknotesIcon className="w-10 h-10 text-gray-700" /></button>
            </div>

        </footer>
    </div>
}
