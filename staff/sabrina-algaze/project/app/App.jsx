import { useState, useEffect } from 'react'

import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router'

import { Landing } from './view/Landing'
import { Register } from './view/Register'

export const App = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleRegisterClicked = () => navigate('/register')

    const handleLoginClicked = () => navigate('/login')

    const handleUserRegistered = () => navigate('/login')

    return <div className="p-2">
        <Routes>
            <Route path="/" element={<Landing onRegisterClicked={handleRegisterClicked} onLoginClicked={handleLoginClicked} />} />

            <Route path="/register" element={<Register onLoginClicked={handleLoginClicked} onUserRegistered={handleUserRegistered} />} />
        </Routes>
    </div>
}