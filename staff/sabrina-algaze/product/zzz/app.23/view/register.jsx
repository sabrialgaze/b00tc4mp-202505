import { logic } from '../logic'

export const Register = ({ onLoginClicked, onUserRegistered, alert }) => {
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
                .then(() => {
                    form.reset()

                    onUserRegistered()
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

    console.debug('Register -> render')

    return <div>
        <h1 className="text-3xl font-semibold bg-gray-200 p-1 mb-2">App</h1>
        <h2 className="text-xl text-center mb-2">Register</h2>
        <form className="flex flex-col gap-1" onSubmit={handleRegisterSubmit}>
            <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" type="text" id="name" /*pattern="^[A-Za-z\\s]+$"*/ />
            </div>
            <div className="flex flex-col">
                <label htmlFor="email">E-mail</label>
                <input className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" type="email" id="email" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="username">Username</label>
                <input className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" type="text" id="username" /*pattern="^[a-zA-Z0-9_]{4,16}$"*/ />
            </div>
            <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input className="border-1 rounded-full px-3 bg-gray-100 text-gray-900" type="password" id="password" /*pattern="^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$"*/ />
            </div>
            <div className="flex justify-end mt-2 gap-1">
                <button className="rounded-full px-3 py-1 border text-gray-700 hover:bg-gray-100 transition" type="reset">Clear</button>
                <button className="rounded-full px-3 py-1 bg-gray-900 text-white hover:bg-gray-700 transition" type="submit">Register</button>
            </div>
        </form>
        <a className="mt-6 text-m text-gray-600 hover:underline" href="" onClick={handleLoginClick}>Login</a>
    </div>
}