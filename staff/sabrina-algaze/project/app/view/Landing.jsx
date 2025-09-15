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
        <h1 className="text-3xl font-semibold bg-gray-200 p-1 mb-2">Count.in</h1>

        <p className="text-center">
            <a className="mt-6 text-m text-gray- hover:underline" href="" onClick={handleRegisterClick}>Register</a> or <a className="mt-6 text-m text-gray- hover:underline" href="" onClick={handleLoginClick}>Login</a>
        </p>
    </div>
}