import { useState, useEffect } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { Landing } from './view/Landing'
import { Register } from './view/Register'
import { Login } from './view/Login'
import { Home } from './view/Home'
import { Loading } from './view/Loading'

import { logic } from './logic'

export const App = () => {
    const [loggedIn, setLoggedIn] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        try {
            const loggedIn = logic.isUserLoggedIn()

            setLoggedIn(loggedIn)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
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

    console.log('App -> render')

    return <Routes>
        <Route path="/" element={
            loggedIn === null ?
                <Loading />
                :
                loggedIn ?
                    <Navigate to="/home" />
                    :
                    <Landing onRegisterClicked={handleRegisterClicked} onLoginClicked={handleLoginClicked} />
        } />

        <Route path="/register" element={
            loggedIn === null ?
                <Loading />
                :
                loggedIn ?
                    <Navigate to="/home" />
                    :
                    <Register onLoginClicked={handleLoginClicked} onUserRegistered={handleUserRegistered} />
        } />

        <Route path="/login" element={
            loggedIn === null ?
                <Loading />
                :
                loggedIn ?
                    <Navigate to="/home" />
                    :
                    <Login onRegisterClicked={handleRegisterClicked} onUserLoggedIn={handleUserLoggedIn} />
        } />

        <Route path="/home/*" element={
            loggedIn === null ?
                <Loading />
                :
                loggedIn ?
                    <Home onUserLoggedOut={handleUserLoggedOut} />
                    :
                    <Navigate to="/" />
        } />

        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
}
