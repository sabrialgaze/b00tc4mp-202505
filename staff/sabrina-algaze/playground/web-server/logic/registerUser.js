const { data } = require('../data/index')

const registerUser = (name, email, username, password) => {
    if (typeof name !== 'string') throw new TypeError('invalid name type')
    if (!name.length) throw new RangeError('invalid name length')

    if (typeof email !== 'string') throw new TypeError('invalid email type')
    if (!email.length) throw new RangeError('invalid email length')

    if (typeof username !== 'string') throw new TypeError('invalid username type')
    if (!username.length) throw new RangeError('invalid username length')

    if (typeof password !== 'string') throw new TypeError('invalid password type')
    if (!password.length) throw new RangeError('invalid password length')

    const users = data.loadUsers()

    let user = users.find(user => user.email === email || user.username === username)

    if (user) throw new Error('user already exists')

    const id = parseInt((Date.now() + Math.random()).toString().replace('.', '')).toString(36)

    user = { id, name, email, username, password, saved: [] }

    users.push(user)

    data.saveUsers(users)
}

module.exports = { registerUser }