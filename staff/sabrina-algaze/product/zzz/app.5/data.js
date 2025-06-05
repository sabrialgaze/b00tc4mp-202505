const setUsers = users => {
    const json = JSON.stringify(users)

    localStorage.users = json
}

const getUsers = () => {
    const json = localStorage.users

    const users = JSON.parse(json || '[]')

    return users
}

const data = {
    setUsers,
    getUsers
}