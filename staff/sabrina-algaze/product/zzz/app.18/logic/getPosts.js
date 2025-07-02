import { data } from '../data'

export const getPosts = () => {
    const userId = data.loadUserId()

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw Error('user not found')

    const posts = data.loadPosts()

    posts.reverse()

    // TODO add author username on each post (mutation)
    posts.forEach(post => {
        const user = users.find(user => user.id === post.author)

        if (!user) throw Error('author not found')

        const { id, username } = user

        // populate author
        post.author = { id, username }

        post.own = post.author.id === userId
    })

    return posts
}