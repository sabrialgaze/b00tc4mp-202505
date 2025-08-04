import { data } from '../data/index.js'
import { validate, NotFoundError, OwnershipError } from 'com'

export const removePost = (userId, postId) => {
    validate.userId(userId)
    validate.postId(postId)

    return data.loadUsers()
        .then(users => {
            const user = users.find(user => user.id === userId)

            if (!user) throw new NotFoundError('user not found')

            return data.loadPosts()
                .then(posts => {
                    const index = posts.findIndex(post => post.id === postId)

                    const post = posts[index]

                    if (index < 0) throw new NotFoundError('post not found')

                    if (post.author !== userId) throw new OwnershipError('user not owner of post')

                    posts.splice(index, 1)

                    return data.savePosts(posts)
                })
        })
}