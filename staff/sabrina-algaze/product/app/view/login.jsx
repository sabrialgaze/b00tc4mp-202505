import { logic } from '../logic'

export const Login = ({ onRegisterClicked, onUserLoggedIn }) => {
    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterClicked()
    }

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password)
                .then(() => {
                    form.reset()

                    onUserLoggedIn()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Login -> render')

    return <div>
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
            <div className="flex flex-col m-y-10">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" /*pattern="^[a-zA-Z0-9_]{4,16}$"*/ />
            </div>
            <div className="flex flex-col m-y-10">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" /*pattern="^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$"*/ />
            </div>
            <div className="flex justify-end">
                <button type="reset">Clear</button>
                <button type="submit">Login</button>
            </div>
        </form>
        <a href="" onClick={handleRegisterClick}>Register</a>
    </div>
}
