import { data } from '../data/index.js'
import { validate, NotFoundError } from 'com'

export const getUserInfo = userId => {
    validate.userId(userId)

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw NotFoundError('user not found')

    delete user.password

    delete user.saved

    return user
}