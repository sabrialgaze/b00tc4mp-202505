import { data } from '../data/index.js'
import { validate, DuplicityError } from 'com'

export const registerUser = (name, email, username, password) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)

    const users = data.loadUsers()

    let user = users.find(user => user.email === email || user.username === username)

    if (user) throw new DuplicityError('user already exists')

    const id = parseInt((Date.now() + Math.random()).toString().replace('.', '')).toString(36)

    user = { id, name, email, username, password }

    users.push(user)

    data.saveUsers(users)
}