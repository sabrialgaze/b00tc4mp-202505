const { useState } = React

const App = () => {
    // const viewState = useState('landing')
    // const view = viewState[0]
    // const setView = viewState[1]
    // const [view, setView] = viewState
    const [view, setView] = useState('landing')

    const handleRegisterClicked = () => setView('register')

    const handleLoginClicked = () => setView('login')

    const handleUserRegistered = () => setView('login')

    const handleUserLoggedIn = () => setView('home')

    console.log('App -> render')

    // if (view === 'landing')
    //     return <Landing />
    // else if (view === 'register')
    //     return <Register />

    return <>
        {view === 'landing' && <Landing onRegisterClicked={handleRegisterClicked} onLoginClicked={handleLoginClicked} />}

        {view === 'register' && <Register onLoginClicked={handleLoginClicked} onUserRegistered={handleUserRegistered} />}

        {view === 'login' && <Login onRegisterClicked={handleRegisterClicked} onUserLoggedIn={handleUserLoggedIn} />}

        {view === 'home' && <Home />}
    </>
}
