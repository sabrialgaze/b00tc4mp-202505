const title = <h1>Register</h1>

const nameLabel = <label htmlFor="name">Name</label>
const nameInput = <input type="text" id="name" pattern="^[A-Za-z\\s]+$" />
const nameField = <div className="flex flex-col m-y-10">{[nameLabel, nameInput]}</div>

const emailLabel = <label htmlFor="email">E-mail</label>
const emailInput = <input type="email" id="email" />
const emailField = <div className="flex flex-col m-y-10">{[emailLabel, emailInput]}</div>

const usernameLabel = <label htmlFor="username">Username</label>
const usernameInput = <input type="text" id="username" pattern="^[a-zA-Z0-9_]{4,16}$" />
const usernameField = <div className="flex flex-col m-y-10">{[usernameLabel, usernameInput]}</div>

const passwordLabel = <label htmlFor="password">Password</label>
const passwordInput = <input type="password" id="password" pattern="^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$" />
const passwordField = <div className="flex flex-col m-y-10">{[passwordLabel, passwordInput]}</div>

const resetButton = <button type="reset">Clear</button>
const submitButton = <button type="submit">Register</button>

const buttons = <div className="flex justify-end">{[resetButton, submitButton]}</div>

const form = <form>{[nameField, emailField, usernameField, passwordField, buttons]}</form>

const loginLink = <a href="" onClick={(e) => {
    e.preventDefault()

    alert('go to login')
}
}>Login</a>

const register = <div>{[title, form, loginLink]}</div>
