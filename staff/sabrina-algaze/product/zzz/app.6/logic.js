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

    const id = parseInt((Date.now() + Math.random()).toString().replace('.', '')).toString(36)

    user = { id, name, email, username, password }

    users.push(user)

    data.setUsers(users)
}

const loginUser = (username, password) => {
    // TODO add regex validations

    if (typeof username !== 'string') throw new TypeError('invalid username')
    if (!username.length) throw new RangeError('invalid username length')

    if (typeof password !== 'string') throw new TypeError('invalid password')
    if (!password.length) throw new RangeError('invalid password length')

    const users = data.getUsers()

    const user = users.find(user => user.username === username)

    if (!user) throw new Error('user not found')

    if (user.password !== password) throw new Error('wrong password')

    data.setUserId(user.id)
}

const getUserInfo = () => {
    const userId = data.getUserId()

    const users = data.getUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw Error('user not found')

    delete user.password

    return user
}

const isUserLoggedIn = () => !!data.getUserId()

const logoutUser = () => data.removeUserId()

const logic = {
    registerUser,
    loginUser,
    getUserInfo,
    isUserLoggedIn,
    logoutUser
}