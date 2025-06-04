const registerUser = (name, email, username, password) => {
    // TODO input validation

    let user = users.find(user => user.email === email || user.username === username)

    if (user) throw new Error('user already exists')

    user = { name, email, username, password }

    users.push(user)
}

const LoginUser = (username, password) => {
    const user = users.find(user => user.username === username)

    if (!user) throw new Error('user not found')

    if (user.password !== password) throw new Error('wrong password')
}