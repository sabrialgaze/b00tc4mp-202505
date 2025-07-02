import { logic } from '../logic'

export const Register = ({ onLoginClicked, onUserRegistered }) => {
    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClicked()
    }

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value

        try {
            logic.registerUser(name, email, username, password)

            form.reset()

            onUserRegistered()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Register -> render')

    return <div>
        <h1>Register</h1>
        <form onSubmit={handleRegisterSubmit}>
            <div className="flex flex-col m-y-10">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" /*pattern="^[A-Za-z\\s]+$"*/ />
            </div>
            <div className="flex flex-col m-y-10">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" />
            </div>
            <div className="flex flex-col m-y-10">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" /*pattern="^[a-zA-Z0-9_]{4,16}$"*/ />
            </div>
            <div className="flex flex-col m-y-10">
                <label htmlFor="password">Password</label>
                <input
                    type="password" id="password" /*pattern="^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$"*/ />
            </div>
            <div className="flex justify-end">
                <button type="reset">Clear</button>
                <button type="submit">Register</button>
            </div>
        </form>
        <a href="" onClick={handleLoginClick}>Login</a>
    </div>
}