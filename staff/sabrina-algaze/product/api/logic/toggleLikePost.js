import { validate, NotFoundError } from 'com'
import { User, Post } from '../data/index.js'


export const toggleLikePost = (userId, postId) => {
    validate.userId(userId)
    validate.postId(postId)

    return User.findById(userId)
        .catch(error => { throw new SystemError('mongo error') })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.updateOne(
                { _id: postId },
                { $addToSet: { likes: userId } }
            )
                .catch(error => { throw new SystemError('mongo error') })
                .then(result => {
                    if (result.matchedCount === 0) { throw new NotFoundError('post not found') }

                    if (result.modifiedCount === 0) {
                        return Post.updateOne(
                            { _id: postId, likes: userId },
                            { $pull: { likes: userId } }
                        )
                            .catch(error => { throw new SystemError('mongo error') })
                            .then(() => { })
                    }
                })
        })
}

