const { data } = require('../data/index')

const getUserInfo = (userId) => {
    if (typeof userId !== 'string') throw new TypeError('Invalid userId type')

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    return user
}

module.exports = { getUserInfo }