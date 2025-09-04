import { useState, useEffect } from 'react'

import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router'

import { Landing } from './view/Landing'
import { Register } from './view/Register'
import { Login } from './view/Login'
import { Home } from './view/Home'
import { Loading } from './view/Loading'
import { Alert } from './view/Alert'
import { Confirm } from './view/Confirm'

import { logic } from './logic'

export const App = () => {
    const [loggedIn, setLoggedIn] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        // NOTE we use setTimeOut to simulate a delay in checking the user's login status
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

    const handleAlertAccepted = () => setAlertMessage(null)

    console.log('App -> render')

    return <div className="p-2">
        <Routes>
            <Route path="/*" element={
                loggedIn === null ?
                    <Loading />
                    :
                    loggedIn ?
                        <Home onUserLoggedOut={handleUserLoggedOut} alert={setAlertMessage} />
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
                        <Register onLoginClicked={handleLoginClicked} onUserRegistered={handleUserRegistered} alert={setAlertMessage} />
            } />

            <Route path="/login" element={
                loggedIn === null ?
                    <Loading />
                    :
                    loggedIn ?
                        <Navigate to="/" />
                        :
                        <Login onRegisterClicked={handleRegisterClicked} onUserLoggedIn={handleUserLoggedIn} alert={setAlertMessage} />
            } />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {alertMessage && <Alert message={alertMessage} onAccepted={handleAlertAccepted} />}

        {/* <Confirm /> */}
    </div>
}
