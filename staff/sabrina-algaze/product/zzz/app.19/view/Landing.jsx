export const Landing = ({ onRegisterClicked, onLoginClicked }) => {
    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterClicked()
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClicked()
    }

    console.debug('Landing -> render')

    return <div>
        <h1>App</h1>

        <p className="text-center">
            <a href="" onClick={handleRegisterClick}>Register</a> or <a href="" onClick={handleLoginClick}>Login</a>
        </p>
    </div>
}
