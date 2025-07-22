import { data } from '../data/index.js'

export const removePost = (userId, postId) => {
    if (typeof userId !== 'string') throw new TypeError('invalid userId type')
    if (typeof postId !== 'string') throw new TypeError('invalid postId type')

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw Error('user not found')

    const posts = data.loadPosts()

    const index = posts.findIndex(post => post.id === postId)

    if (index < 0) throw Error('post not found')

    posts.splice(index, 1)

    data.savePosts(posts)
}