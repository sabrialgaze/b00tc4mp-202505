let userLoggedIn = false

try {
    userLoggedIn = logic.isUserLoggedIn()
} catch (error) {
    alert(error.message)
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)








