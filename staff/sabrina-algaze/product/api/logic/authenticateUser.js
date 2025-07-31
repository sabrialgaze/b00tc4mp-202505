import { data } from '../data/index.js'
import { validate, NotFoundError, CredentialsError } from 'com'

export const authenticateUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    return data.loadUsers()
        .then(users => {
            const user = users.find(user => user.username === username)

            if (!user) throw new NotFoundError('user not found')

            if (user.password !== password) throw new CredentialsError('wrong password')

            return user.id
        })
}
