const getPosts = () => {
    const userId = data.loadUserId()

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw Error('user not found')

    const posts = data.loadPosts()

    posts.reverse()

    // TODO add author username on each post (mutation)

    return posts
}