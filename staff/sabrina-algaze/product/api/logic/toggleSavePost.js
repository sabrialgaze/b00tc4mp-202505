import { data } from '../data/index.js'
import { validate, NotFoundError } from 'com'

export const toggleSavePost = (userId, postId) => {
    validate.userId(userId)
    validate.postId(postId)

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw NotFoundError('user not found')

    const posts = data.loadPosts()

    const post = posts.find(post => post.id === postId)

    if (!post) throw NotFoundError('post not found')

    const { saved } = user

    const index = saved.findIndex(savedPostId => savedPostId === postId)

    if (index < 0) saved.push(postId)

    else saved.splice(index, 1)

    data.saveUsers(users)
}