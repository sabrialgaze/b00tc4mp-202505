import { data } from '../data'

export const removePost = postId => {
    const userId = data.loadUserId()

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw Error('user not found')

    const posts = data.loadPosts()

    const index = posts.findIndex(post => post.id === postId)

    if (index < 0) throw Error('post not found')

    posts.splice(index, 1)

    data.savePosts(posts)
}