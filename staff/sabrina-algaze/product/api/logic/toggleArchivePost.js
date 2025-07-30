import { data } from '../data/index.js'
import { validate, NotFoundError } from 'com'

export const toggleArchivePost = (userId, postId) => {
    validate.userId(userId)
    validate.postId(postId)

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw new NotFoundError('user not found')

    const posts = data.loadPosts()

    const post = posts.find(post => post.id === postId)

    if (!post) throw new NotFoundError('post not found')

    post.archived = !post.archived

    data.savePosts(posts)
}