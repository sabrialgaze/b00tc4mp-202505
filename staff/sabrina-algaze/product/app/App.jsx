import { useState, useEffect } from 'react'

import { Routes, Route, useNavigate } from 'react-router'

import { Landing } from './view/landing'
import { Register } from './view/register'
import { Login } from './view/login'
import { Home } from './view/Home'

import { logic } from './logic'

export const App = () => {
    const navigate = useNavigate()

    useEffect(() => {
        try {
            const loggedIn = logic.isUserLoggedIn()

            if (loggedIn) navigate('/home')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    })

    const handleRegisterClicked = () => navigate('/register')

    const handleLoginClicked = () => navigate('/login')

    const handleUserRegistered = () => navigate('/login')

    const handleUserLoggedIn = () => navigate('/home')

    const handleUserLoggedOut = () => navigate('/login')

    console.log('App -> render')

    return <Routes>
        <Route path="/" element={<Landing onRegisterClicked={handleRegisterClicked} onLoginClicked={handleLoginClicked} />} />

        <Route path="/register" element={<Register onLoginClicked={handleLoginClicked} onUserRegistered={handleUserRegistered} />} />

        <Route path="/login" element={<Login onRegisterClicked={handleRegisterClicked} onUserLoggedIn={handleUserLoggedIn} />} />

        <Route path="/home" element={<Home onUserLoggedOut={handleUserLoggedOut} />} />
    </Routes>
}
