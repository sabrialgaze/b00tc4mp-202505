import { validate, NotFoundError, SystemError } from 'com'
import { User, Post } from '../data/index.js'

export const toggleSavePost = (userId, postId) => {
    validate.userId(userId)
    validate.postId(postId)

    return Post.findById(postId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(post => {
            if (!post) throw new NotFoundError('post not found')

            return User.updateOne(
                { _id: userId },
                { $addToSet: { saved: postId } }
            )
                .catch(error => { throw new SystemError('mongo error') })
                .then(result => {
                    if (result.matchedCount === 0) throw new NotFoundError('user not found')

                    if (result.modifiedCount === 0) {
                        return User.updateOne(
                            { _id: userId, saved: postId },
                            { $pull: { saved: postId } }
                        )
                            .catch(error => { throw new SystemError('mongo error') })
                            .then(() => { })
                    }
                })
        })
}