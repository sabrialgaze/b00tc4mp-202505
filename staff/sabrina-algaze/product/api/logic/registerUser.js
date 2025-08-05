import { data } from '../data/index.js'
import { validate, DuplicityError, SystemError } from 'com'
import bcrypt from 'bcryptjs'

export const registerUser = (name, email, username, password) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)

    return data.loadUsers()
        .then(users => {
            let user = users.find(user => user.email === email || user.username === username)

            if (user) throw new DuplicityError('user already exists')

            const id = parseInt((Date.now() + Math.random()).toString().replace('.', '')).toString(36)

            return bcrypt.hash(password, 10)
                .catch(error => {
                    throw new SystemError('password hash error')
                })
                .then(hash => {
                    user = { id, name, email, username, password: hash, saved: [] }

                    users.push(user)

                    return data.saveUsers(users)
                })
        })
}