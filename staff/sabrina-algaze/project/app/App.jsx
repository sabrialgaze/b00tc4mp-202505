import { useState, useEffect } from 'react'

import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router'

import { Landing } from './view/Landing'
import { Register } from './view/Register'
import { Login } from './view/Login'
import { Home } from './view/Home'
import { Loading } from './view/Loading'

import { logic } from './logic'

export const App = () => {
    const [loggedIn, setLoggedIn] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        // Note we use setTimeOut to simulate a delay in checking the user/s login status
        setTimeout(() => {
            try {
                const loggedIn = logic.isUserLoggedIn()

                setLoggedIn(loggedIn)
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        }, 500)
    }, [])

    const handleRegisterClicked = () => navigate('/register')

    const handleLoginClicked = () => navigate('/login')

    const handleUserRegistered = () => navigate('/login')

    const handleUserLoggedIn = () => {
        setLoggedIn(true)

        navigate('/home')
    }

    const handleUserLoggedOut = () => {
        setLoggedIn(false)

        navigate('/login')
    }

    return <div className="p-2">
        <Routes>
            <Route path="/*" element={
                loggedIn === null ?
                    <Loading />
                    :
                    loggedIn ?
                        location.pathname === '/' ?
                            <Home onUserLoggedOut={handleUserLoggedOut} />
                            :
                            <Navigate to="/" />
                        :
                        location.pathname === '/' ?
                            <Landing onRegisterClicked={handleRegisterClicked} onLoginClicked={handleLoginClicked} />
                            :
                            <Navigate to="/" />
            } />

            <Route path="/register" element={
                loggedIn === null ?
                    <Loading />
                    :
                    loggedIn ?
                        <Navigate to="/" />
                        :
                        <Register onLoginClicked={handleLoginClicked} onUserRegistered={handleUserRegistered} />
            } />

            <Route path="/login" element={
                loggedIn === null ?
                    <Loading />
                    :
                    loggedIn ?
                        <Navigate to="/" />
                        :
                        <Login onRegisterClicked={handleRegisterClicked} onUserLoggedIn={handleUserLoggedIn} />
            } />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </div>
}