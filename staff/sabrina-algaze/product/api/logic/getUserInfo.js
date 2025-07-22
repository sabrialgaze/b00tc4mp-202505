import { data } from '../data/index.js'

export const getUserInfo = userId => {
    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw Error('user not found')

    delete user.password

    return user
}