import { data } from '../data/index.js'

export const toggleArchivePost = (userId, postId) => {
    if (typeof userId !== 'string') throw new TypeError('invalid userId type')
    if (typeof postId !== 'string') throw new TypeError('invalid postId type')

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw Error('user not found')

    const posts = data.loadPosts()

    const post = posts.find(post => post.id === postId)

    if (!post) throw Error('post not found')

    post.archived = !post.archived

    data.savePosts(posts)
}