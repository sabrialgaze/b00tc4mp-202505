const registerUser = (name, email, username, password) => {
    // TODO add regex validations

    if (typeof name !== 'string') throw new TypeError('invalid name')
    if (!name.length) throw new RangeError('invalid name length')

    if (typeof email !== 'string') throw new TypeError('invalid email')
    if (!email.length) throw new RangeError('invalid email length')

    if (typeof username !== 'string') throw new TypeError('invalid username')
    if (!username.length) throw new RangeError('invalid username length')

    if (typeof password !== 'string') throw new TypeError('invalid password')
    if (!password.length) throw new RangeError('invalid password length')

    const users = data.getUsers()

    let user = users.find(user => user.email === email || user.username === username)

    if (user) throw new Error('user already exists')

    user = { name, email, username, password }

    users.push(user)

    data.setUsers(users)
}

const LoginUser = (username, password) => {
    // TODO add regex validations

    if (typeof username !== 'string') throw new TypeError('invalid username')
    if (!username.length) throw new RangeError('invalid username length')

    if (typeof password !== 'string') throw new TypeError('invalid password')
    if (!password.length) throw new RangeError('invalid password length')

    const users = data.getUsers()

    const user = users.find(user => user.username === username)

    if (!user) throw new Error('user not found')

    if (user.password !== password) throw new Error('wrong password')
}

const logic = {
    registerUser,
    LoginUser
}