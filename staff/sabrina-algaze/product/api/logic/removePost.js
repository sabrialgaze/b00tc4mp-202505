import { data } from '../data/index.js'
import { validate, NotFoundError } from 'com'

export const removePost = (userId, postId) => {
    validate.userId(userId)
    validate.postId(postId)

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw NotFoundError('user not found')

    const posts = data.loadPosts()

    const index = posts.findIndex(post => post.id === postId)

    if (index < 0) throw NotFoundError('post not found')

    posts.splice(index, 1)

    data.savePosts(posts)
}