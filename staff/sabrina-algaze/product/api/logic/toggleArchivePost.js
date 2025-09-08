import { validate, NotFoundError, SystemError, OwnershipError } from 'com'
import { User, Post } from '../data/index.js'


export const toggleArchivePost = (userId, postId) => {
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
                    if (post.author.toString() !== userId) throw new OwnershipError('user not owner of post')

                    return Post.updateOne(
                        { _id: postId },
                        [{ $set: { archived: { $not: "$archived" } } }],
                    )
                        .catch(error => { throw new SystemError('mongo error') })
                        .then(result => { })
                })
        })
}

