const title = <h1>Login</h1>

const usernameLabel = <label htmlFor="username">Username</label>
const usernameInput = <input type="text" id="username" pattern="^[a-zA-Z0-9_]{4,16}$" />
const usernameField = <div className="flex flex-col m-y-10">{[usernameLabel, usernameInput]}</div>

const passwordLabel = <label htmlFor="password">Password</label>
const passwordInput = <input type="password" id="password" pattern="^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$" />
const passwordField = <div className="flex flex-col m-y-10">{[passwordLabel, passwordInput]}</div>

const resetButton = <button type="reset">Clear</button>
const submitButton = <button type="submit">Login</button>

const buttons = <div className="flex justify-end">{[resetButton, submitButton]}</div>

const form = <form>{[usernameField, passwordField, buttons]}</form>

const registerLink = <a href="" onClick={(e) => {
    e.preventDefault()

    alert('go to register')
}
}>Register</a>

const login = <div>{[title, form, registerLink]}</div>
