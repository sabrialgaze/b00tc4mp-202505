const setUsers = users => {
    const json = JSON.stringify(users)

    localStorage.users = json
}

const getUsers = () => {
    const json = localStorage.users

    const users = JSON.parse(json || '[]')

    return users
}

const setUserId = userId => sessionStorage.userId = userId

const getUserId = () => sessionStorage.userId

const removeUserId = () => delete sessionStorage.userId

const data = {
    setUsers,
    getUsers,

    setUserId,
    getUserId,
    removeUserId
}