import { data } from '../data/index.js'
import { validate, NotFoundError } from 'com'

export const toggleArchivePost = (userId, postId) => {
    validate.userId(userId)
    validate.postId(postId)

    return data.loadUsers()
        .then(users => {
            const user = users.find(user => user.id === userId)

            if (!user) throw new NotFoundError('user not found')

            return data.loadPosts()
                .then(posts => {
                    const post = posts.find(post => post.id === postId)

                    if (!post) throw new NotFoundError('post not found')

                    post.archived = !post.archived

                    return data.savePosts(posts)
                })
        })
}