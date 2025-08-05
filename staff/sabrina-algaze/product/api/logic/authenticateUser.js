import { data } from '../data/index.js'
import { validate, NotFoundError, CredentialsError, SystemError } from 'com'
import bcrypt from 'bcryptjs'

export const authenticateUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    return data.loadUsers()
        .then(users => {
            const user = users.find(user => user.username === username)

            if (!user) throw new NotFoundError('user not found')

            return bcrypt.compare(password, user.password)
                .catch(error => {
                    throw new SystemError('password compare error')
                })
                .then(match => {
                    if (!match) throw new CredentialsError('wrong password')

                    return user.id
                })
        })
}
