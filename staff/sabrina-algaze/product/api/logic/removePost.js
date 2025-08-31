import { validate, NotFoundError, OwnershipError, SystemError } from 'com'
import { User, Post } from '../data/models.js'

export const removePost = (userId, postId) => {
    validate.userId(userId)
    validate.postId(postId)

    return User.findById(userId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.findById(postId)
                .catch(error => { throw new SystemError('mongo error') })
                .then(post => {
                    if (!post) throw new NotFoundError('post not found')

                    if (user.role !== 'administrator' && post.author.toString() !== userId) throw new OwnershipError('user not owner of post')

                    return Post.deleteOne({ _id: postId })
                })
                .then(() => { })

        })
}