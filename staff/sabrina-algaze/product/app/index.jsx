import { createRoot } from 'react-dom/client'

import { App } from './App'

import { logic } from './logic'

let userLoggedIn = false

try {
    userLoggedIn = logic.isUserLoggedIn()
} catch (error) {
    alert(error.message)
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)








