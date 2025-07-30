import { data } from '../data/index.js'
import { validate, NotFoundError } from 'com'

export const toggleLikePost = (userId, postId) => {
    validate.userId(userId)
    validate.postId(postId)

    const users = data.loadUsers()

    const user = users.find(user => user.id === userId)

    if (!user) throw new NotFoundError('user not found')

    const posts = data.loadPosts()

    const post = posts.find(post => post.id === postId)

    if (!post) throw new NotFoundError('post not found')

    const { likes } = post

    const index = likes.findIndex(likeUserId => likeUserId === userId)

    if (index < 0) likes.push(userId)

    else likes.splice(index, 1)

    data.savePosts(posts)
}