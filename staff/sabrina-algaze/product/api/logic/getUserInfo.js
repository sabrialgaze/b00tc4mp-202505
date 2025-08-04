import { data } from '../data/index.js'
import { validate, NotFoundError } from 'com'

export const getUserInfo = userId => {
    validate.userId(userId)

    return data.loadUsers()
        .then(users => {
            const user = users.find(user => user.id === userId)

            if (!user) throw new NotFoundError('user not found')

            delete user.password

            delete user.saved

            return user
        })
}