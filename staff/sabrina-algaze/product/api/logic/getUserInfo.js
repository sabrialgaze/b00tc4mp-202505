import { data } from '../data/index.js'

export const getUserInfo = userId => {
    if (typeof userId !== 'string') throw new TypeError('invalid userId type')

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw Error('user not found')

    delete user.password

    delete user.saved

    return user
}