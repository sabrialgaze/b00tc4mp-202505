import { data } from '../data'

export const registerUser = (name, email, username, password) => {
    if (typeof name !== 'string') throw new TypeError('invalid name')
    if (!name.length) throw new RangeError('invalid name length')

    const nameRegex = /^[a-zA-Z\s]+$/
    if (!nameRegex.test(name)) throw new Error('invalid name format')

    if (typeof email !== 'string') throw new TypeError('invalid email')
    if (!email.length) throw new RangeError('invalid email length')

    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/
    if (!emailRegex.test(email)) throw new Error('invalid email format')

    if (typeof username !== 'string') throw new TypeError('invalid username')
    if (!username.length) throw new RangeError('invalid username length')

    const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/
    if (!usernameRegex.test(username)) throw new Error('invalid username format')

    if (typeof password !== 'string') throw new TypeError('invalid password')
    if (!password.length) throw new RangeError('invalid password length')

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    if (!passwordRegex.test(password)) throw new Error('invalid password format')



    const users = data.loadUsers()

    let user = users.find(user => user.email === email || user.username === username)

    if (user) throw new Error('user already exists')

    const id = parseInt((Date.now() + Math.random()).toString().replace('.', '')).toString(36)

    user = { id, name, email, username, password, saved: [], archived: [] }

    users.push(user)

    data.saveUsers(users)
}