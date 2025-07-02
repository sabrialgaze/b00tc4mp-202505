const saveUsers = users => {
    const json = JSON.stringify(users)

    localStorage.users = json
}

const loadUsers = () => {
    const json = localStorage.users

    const users = JSON.parse(json || '[]')

    return users
}

const saveUserId = userId => sessionStorage.userId = userId

const loadUserId = () => sessionStorage.userId

const removeUserId = () => delete sessionStorage.userId


const savePosts = posts => {
    const json = JSON.stringify(posts)

    localStorage.posts = json
}

const loadPosts = () => {
    const json = localStorage.posts

    const posts = JSON.parse(json || '[]')

    return posts
}


const data = {
    saveUsers,
    loadUsers,

    saveUserId,
    loadUserId,
    removeUserId,

    savePosts,
    loadPosts
}