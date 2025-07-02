const loginUser = (username, password) => {
    if (typeof username !== 'string') throw new TypeError('invalid username')
    if (!username.length) throw new RangeError('invalid username length')

    const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/
    if (!usernameRegex.test(username)) throw new Error('invalid username format')

    if (typeof password !== 'string') throw new TypeError('invalid password')
    if (!password.length) throw new RangeError('invalid password length')

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    if (!passwordRegex.test(password)) throw new Error('invalid password format')


    const users = data.loadUsers()

    const user = users.find(user => user.username === username)

    if (!user) throw new Error('user not found')

    if (user.password !== password) throw new Error('wrong password')

    data.saveUserId(user.id)
}