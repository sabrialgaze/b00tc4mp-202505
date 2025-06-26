const title = <h1>App</h1>
const registerLink = <a href="" onClick={function (event) {
    event.preventDefault()

    alert('go to register')
}
}>Register</a>

const loginLink = <a href="" onClick={function (event) {
    event.preventDefault()

    alert('go to login')
}
}>Login</a>

const navigations = <p className="text-center">{[registerLink, ' or ', loginLink]}</p>

const landing = <div>{[title, navigations]}</div>
