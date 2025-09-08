import { useState, useEffect } from 'react'

import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router'

import { Landing } from './view/Landing'
import { Register } from './view/Register'
import { Login } from './view/Login'

export const App = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleRegisterClicked = () => navigate('/register')

    const handleLoginClicked = () => navigate('/login')

    const handleUserRegistered = () => navigate('/login')

    const handleUserLoggedIn = () => {
        // TODO
    }

    return <div className="p-2">
        <Routes>
            <Route path="/" element={<Landing onRegisterClicked={handleRegisterClicked} onLoginClicked={handleLoginClicked} />
            } />

            <Route path="/register" element={<Register onLoginClicked={handleLoginClicked} onUserRegistered={handleUserRegistered} />
            } />

            <Route path="/login" element={<Login onRegisterClicked={handleRegisterClicked} onUserLoggedIn={handleUserLoggedIn} />
            } />
        </Routes>
    </div>
}